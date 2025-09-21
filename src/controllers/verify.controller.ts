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

        res.json({ message: "Email Verified", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}