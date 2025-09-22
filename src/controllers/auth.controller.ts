import { Request, Response } from "express";
import prisma from "../prisma/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const SECRET_KEY = process.env.SECRET_KEY
        
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }   

        const token = jwt.sign({id: user.id, email: user.email, role: user.role, emailVerified: user.emailVerified}, SECRET_KEY, { expiresIn: "1h"})
        const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_SECRET_KEY, { expiresIn: "7d"});

        const { id: _id, password: _password, image: _image,...safeUser } = user;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        
        res.status(200).json({ user: safeUser, message: "Login Successfull!", success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ error: "No refresh token provided", success: false });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY) as { id: string };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found", success: false });
        }

        const newToken = jwt.sign({id: user.id, email: user.email, role: user.role, emailVerified: user.emailVerified}, process.env.SECRET_KEY, { expiresIn: "1h"});

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });
        
        const { id: _id, password: _password, image: _image,...safeUser } = user;

        res.status(200).json({ user: safeUser, message: "User Get Successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.clearCookie("refreshToken")

        res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

