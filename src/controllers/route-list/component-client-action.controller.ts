import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getComponentClientAction = async (req: Request, res: Response) => {
  try {
    const { componentId, clientId } = req.query;

    if (!componentId || !clientId) {
      return res
        .status(400)
        .json({ message: "Missing ConponentId and ClientId", success: false });
    }

    const clientAction = await prisma.routeComponentAction.findMany({
      where: {
        componentId: String(componentId),
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

    return res
      .status(200)
      .json({
        message: "Successfully Fetch Client Action",
        data: clientAction,
        success: true,
      });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
