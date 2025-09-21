import prisma from "../prisma/prisma";
import { Request, Response } from "express";

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        await prisma.user.update({
            where: {
                id
            },
            data: {
                emailVerified: new Date()
            }
        })

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