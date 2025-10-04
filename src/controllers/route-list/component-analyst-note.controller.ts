import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import jwt from "jsonwebtoken";
import { createAnalystNoteSchema } from "../../types/validator";
import z from "zod";

export const createComponentAnalystNote = async (
  req: Request,
  res: Response
) => {
  try {
    const parsed = createAnalystNoteSchema.parse(req.body);
    const { routeComponentId, note, analyst } = parsed;

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

    // Create new RouteComponentAnalystNote
    const newNote = await prisma.routeComponentNote.create({
      data: {
        clientId: (decoded as any).id,
        routeComponentId,
        note,
        analyst,
      },
    });

    return res.status(201).json({
      message: "Successfully created analyst note",
      data: newNote,
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Invalid Data Input",
      });
    }
    console.error("Error creating analyst note:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getComponentAnalystNote = async (req: Request, res: Response) => {
  try {
    const { routeComponentId, clientId } = req.query;

    if (!routeComponentId || !clientId) {
      return res
        .status(400)
        .json({ message: "Missing ConponentId and ClientId", success: false });
    }

    const routeComponentNote = await prisma.routeComponentNote.findMany({
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
        note: true,
        analyst: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      message: "Successfully Fetch Analyst Note",
      data: routeComponentNote,
      success: true,
    });
  } catch (error) {
    console.error("Error Fetching Analyst Note:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
