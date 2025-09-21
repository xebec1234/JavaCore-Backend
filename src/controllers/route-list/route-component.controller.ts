import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getRouteComponents = async (req: Request, res: Response) => {
  try {
    const {routeEquipmentId} = req.query;

    if (!routeEquipmentId || typeof routeEquipmentId !== "string") {
      return res
        .status(400)
        .json({ message: "Missing routeEquipmentId", success: false });
    }

    const routeComponents = await prisma.routeComponent.findMany({
      where: {
        routeEquipmentId: routeEquipmentId,
      },
      select: {
        id: true,
        routeEquipmentId: true,
        component: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      routeComponents,
      message: "Route Components Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching route components:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
