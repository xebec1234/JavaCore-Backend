import prisma from "../prisma/prisma"
import { Request, Response } from "express";

export const getClients = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({ users, message: "User Fetched Successfully", success: true})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}