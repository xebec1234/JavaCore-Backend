import prisma from "../prisma/prisma";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const getClients = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "user" },
      select: { id: true, name: true },
    });

    res
      .status(200)
      .json({ users, message: "User Fetched Successfully", success: true });
    console.log("Users:", users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(200)
        .json({ error: "Passwords do not match", success: false });
    }

    const [existingEmail, existingUsername] = await Promise.all([
      prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      }),
      prisma.user.findUnique({
        where: { name: name.toLowerCase() },
      }),
    ]);

    if (existingEmail || existingUsername) {
      return res
        .status(200)
        .json({ error: "Email or name already exist", success: false });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    res
      .status(200)
      .json({ message: "User Registered Successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ error: "Expired", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (typeof decoded === "string") {
      return res
        .status(400)
        .json({ error: "Invalid Token Payload", success: false });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    const {
      id: _id,
      emailVerified: _emailVerified,
      password: _password,
      image: _image,
      ...safeUser
    } = user;

    res.status(200).json({
      user: safeUser,
      message: "User Get Successfully",
      success: true,
    });
  } catch (error) {
    console.log("ERRRRRRRRRRRRRRROR", error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};
