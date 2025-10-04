import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import jwt from "jsonwebtoken";
import { createActionSchema } from "../../types/validator";
import z from "zod";

export const createComponentClientAction = async (
  req: Request,
  res: Response
) => {
  try {
    const parsed = createActionSchema.parse(req.body);
    const { routeComponentId, action, woNumber } = parsed;

    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "Token Expired", success: false });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

    if (typeof decoded === "string" || !decoded || !("id" in decoded)) {
      return res
        .status(400)
        .json({ message: "Invalid Token Payload", success: false });
    }

    //Create new RouteComponentAction
    const newAction = await prisma.routeComponentAction.create({
      data: {
        clientId: (decoded as any).id,
        routeComponentId,
        action,
        woNumber,
      },
    });

    return res.status(201).json({
      message: "Successfully created client action",
      data: newAction,
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Invalid Data Input",
      });
    }
    console.error("Error creating client action:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getComponentClientAction = async (req: Request, res: Response) => {
  try {
    const { routeComponentId, clientId } = req.query;

    if (!routeComponentId || !clientId) {
      return res
        .status(400)
        .json({ message: "Missing ConponentId and ClientId", success: false });
    }

    const clientAction = await prisma.routeComponentAction.findMany({
      where: {
        routeComponentId: String(routeComponentId),
        clientId: String(clientId),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
      select: {
        id: true,
        action: true,
        woNumber: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      message: "Successfully Fetch Client Action",
      data: clientAction,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
