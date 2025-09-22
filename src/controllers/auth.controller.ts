import { Request, Response } from "express";
import prisma from "../prisma/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { generateOtp } from "../generated/generateOtp";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, device } = req.body
        const otp = await generateOtp()

        const SECRET_KEY = process.env.SECRET_KEY
        
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isDeviceVerified = await prisma.verifiedDevice.findFirst({
            where: { userId: user.id, userAgent: device },
        })

        if (!isDeviceVerified) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    otp,
                    otpExpires: new Date(Date.now() + 10 * 60 * 1000),
                    otpCooldown: new Date(Date.now() + 2 * 60 * 1000),
                }
            })
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            })

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Verify New Device',
                text: `Your OTP code is: ${otp.toString()}. If you did not attempt to login, please secure your account immediately.`,
            };

            await transporter.sendMail(mailOptions);           
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }   

        const token = jwt.sign({
            id: user.id, 
            email: user.email, 
            role: user.role, 
            emailVerified: user.emailVerified, 
            deviceVerified: !isDeviceVerified ? false : true
        }, SECRET_KEY, { expiresIn: "1h"})

        const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_SECRET_KEY, { expiresIn: "7d"});

        const { id: _id, password: _password, image: _image, otp: _otp, otpExpires: _otpExpires, otpCooldown: _otpCooldown,...safeUser } = user;

        const updatedUser: typeof safeUser & { deviceVerified: boolean } = {
            ...safeUser,
            deviceVerified: !isDeviceVerified ? false : true,
        };

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
        
        res.status(200).json({ user: updatedUser, message: "Login Successfull!", success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies;
        const { userAgent } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ error: "No refresh token provided", success: false });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY) as { id: string, deviceVerified?: boolean };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found", success: false });
        }

        const isDeviceVerified = await prisma.verifiedDevice.findFirst({
            where: { userId: user.id, userAgent}
        })

        const newToken = jwt.sign({
            id: user.id, 
            email: user.email, 
            role: user.role, 
            emailVerified: user.emailVerified, 
            deviceVerified: isDeviceVerified !== null ? true : false
        }, process.env.SECRET_KEY, { expiresIn: "1h"});

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });
        
        const { id: _id, password: _password, image: _image, otp: _otp, otpExpires: _otpExpires, otpCooldown: _otpCooldown,...safeUser } = user;

        const updatedUser: typeof safeUser & { deviceVerified: boolean } = {
            ...safeUser,
            deviceVerified: isDeviceVerified !== null ? true : false,
        };

        res.status(200).json({ user: updatedUser, message: "User Get Successfully", success: true });
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

