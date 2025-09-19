import { Request, Response } from "express";
import prisma from "../prisma/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    const { name , email, password } = req.body;

    if(!name || !email || !password) {
        return res.json({ error: "Name, email, and password are required."}).status(400)
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const user = await prisma.user.create({
            data: { 
                name, 
                email,
                password: hashedPassword
            }
        });
        
        res.status(201).json({ message: "Register User Succesfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

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

        const token = jwt.sign({id: user.id, role: user.role}, SECRET_KEY, { expiresIn: "1h"})

        const { id: _id, emailVerified: _emailVerified, password: _password, image: _image,...safeUser } = user;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });
        
        res.status(200).json({ user: safeUser, message: "Login Successfull!", success: true })
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

        res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}