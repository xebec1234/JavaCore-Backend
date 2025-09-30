import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

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
