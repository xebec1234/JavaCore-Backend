import prisma from "../prisma/prisma";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { generateOtp } from "../generated/generateOtp";

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if(!id) {
            res.status(400).json({ error: "User ID is required", success: false });
        }

        await prisma.user.update({
            where: {
                id
            },
            data: {
                emailVerified: new Date()
            }
        })

        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                email: true,
                name: true
            }
        })

        if(!user) {
            return res.status(404).json({ error: "User not found", success: false });
        }

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
            subject: 'Letter of Verification',
            text: `Welcome to Java Condition Monitoring ${user.name}!`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "User Verified", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const unverifiedUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findMany({
            where: {
                emailVerified: null,
                role: "user"
            }
        })

        const safeUsers = user.map(({ id, email, emailVerified, name }) => ({ id, email, emailVerified, name }));

        res.status(200).json({ users: safeUsers, message: "Users Get Successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const verifyDevice = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const { value, device } = req.body;

        if (!token) {
            return res.status(401).json({ error: "No token provided", success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY) as { id: string, deviceVerified?: boolean };
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        })

        if (!user) {
            return res.status(401).json({ error: "User not found", success: false });
        }

        if (user.otpExpires && user.otpExpires < new Date()) {
            return res.status(400).json({ error: "Please request a new one.", success: false });
        }

        if (user.otp !== Number(value)) {
            return res.status(400).json({ error: "Invalid OTP", success: false });
        }

        await prisma.verifiedDevice.create({
            data: {
                userId: user.id,
                userAgent: device
            }
        })

        const newToken = jwt.sign({
            id: user.id, 
            email: user.email, 
            role: user.role, 
            emailVerified: user.emailVerified, 
            deviceVerified: true
        }, process.env.SECRET_KEY, { expiresIn: "1h"})

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        const { id: _id, password: _password, image: _image, otp: _otp, otpExpires: _otpExpires, otpCooldown: _otpCooldown,...safeUser } = user;

        const updatedUser: typeof safeUser & { deviceVerified: boolean } = {
            ...safeUser,
            deviceVerified: true,
        };

        res.status(200).json({ user: updatedUser, message: "Device Verified Successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const requestOtp = async (req: Request, res: Response) => {
    try {
        const otp = await generateOtp()
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "No token provided", success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (typeof decoded === "string") {
            return res
                .status(400)
                .json({ error: "Invalid Token Payload", success: false });
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { 
                id: true,
                email: true,
                otpCooldown: true,
             }
        })

        if (!user) {
            return res.status(401).json({ error: "User not found", success: false });
        }

        if(user.otpCooldown && user.otpCooldown > new Date()) {
            const secondsLeft = Math.ceil((user.otpCooldown.getTime() - new Date().getTime()) / 1000);
            return res.status(200).json({ message: `Please wait otp cooldown.`, seconds: secondsLeft, success: false });
        }

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
            to: decoded.email,
            subject: 'Verify New Device',
            text: `Your OTP code is: ${otp.toString()}. If you did not attempt to login, please secure your account immediately.`,
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: "OTP Sent Successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}