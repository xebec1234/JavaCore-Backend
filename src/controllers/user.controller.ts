import prisma from "../prisma/prisma"
import { Request, Response } from "express";
import bcryptjs from "bcryptjs"

export const getClients = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({ users, message: "User Fetched Successfully", success: true})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const {name, email, password, confirmPassword} = req.body

        if(password !== confirmPassword) {
            return res.status(200).json({ error: "Passwords do not match", success: false})
        }

        const [existingEmail, existingUsername] = await Promise.all([
          prisma.user.findUnique({
            where: { email: email.toLowerCase() }
          }),
          prisma.user.findUnique({
            where: { name: name.toLowerCase() }
          })
        ])

        if(existingEmail || existingUsername) {
            return res.status(200).json({ error: "Email or name already exist", success: false})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await prisma.user.create({
          data: {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
          },
        });
        
        res.status(200).json({ message: "User Registered Successfully", success: true})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}