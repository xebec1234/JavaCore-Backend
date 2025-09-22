import prisma from "../prisma/prisma";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

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
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}