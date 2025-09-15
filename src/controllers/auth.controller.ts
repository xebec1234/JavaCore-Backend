import { Request, Response } from "express";
import prisma from "../prisma/prisma"

export const createUser = async (req: Request, res: Response) => {
    const { name , email } = req.body;

    if(!name || !email) {
        return res.json({ error: "Name and email are required."}).status(400)
    }

    console.log(name, email);
    

    // try {
    //     const user = await prisma.user.create({
    //         data: { 
    //             name, 
    //             email 
    //         }
    //     });
        
    //     res.status(201).json(user);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "Failed to create user." });
    // }
}