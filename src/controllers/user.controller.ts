import prisma from "../prisma/prisma";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import axios from "axios";

interface EmailValidationResponse {
  email_deliverability: {
    status: string;
    status_detail: string
    [key: string]: any;
  };
  [key: string]: any;
}

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
        if(password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match", success: false})
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
            return res.status(400).json({ error: "Email or name already exist", success: false})
        }

        // const { data } = await axios.get<EmailValidationResponse>(`https://emailreputation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`)
        
        // if(data.email_deliverability.status !== "deliverable" || data.email_deliverability.status_detail !== "valid_email") {
        //   return res.status(400).json({ error: "Email is not valid", success: false})
        // }

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

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const userAgent = req.query.ua as string;  
        
        if (!token) {
            return res.status(401).json({ error: "No token provided", status: 400, success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY) as { id: string, deviceVerified?: boolean };     

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found", success: false });
        }

        const isDeviceVerified = await prisma.verifiedDevice.findFirst({
          where: {
            userId: decoded.id,
            userAgent
          }
        })
        

        const { id: _id, password: _password, image: _image, otp: _otp, otpExpires: _otpExpires, otpCooldown: _otpCooldown,...safeUser } = user;

        const updatedUser: typeof safeUser & { deviceVerified: boolean } = {
            ...safeUser,
            deviceVerified: isDeviceVerified !== null ? true : false,
        };

        res.status(200).json({ user: updatedUser, message: "User Get Successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Passwords do not match", success: false });
    }

    if (!token) {
      return res.status(400).json({ error: "Token Expired", success: false });
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

    if (!user) {
      return res.status(400).json({ error: "User not found", success: false });
    }

    const isPasswordValid = await bcryptjs.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: "Current password is incorrect", success: false });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    res
      .status(200)
      .json({ message: "Password Changed Successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};
