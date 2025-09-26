import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getRecentRoutes = async (req: Request, res: Response) => {
  try {

    const recentRoutes = await prisma.routeList.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        routeName: true,
        createdAt: true,
        isUsed: true,
      },
    });

    return res.json({ success: true, routes: recentRoutes });
  } catch (error) {
    console.error("Error fetching routes:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
