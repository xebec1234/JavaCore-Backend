import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getRouteComponent = async (req: Request, res: Response) => {
  try {
    const routeEquipmentId = req.query.routeEquipmentId;
    if (!routeEquipmentId) {
      return res
        .status(400)
        .json({ message: "Missing routeEquipmentId", success: false });
    }

    // Make sure routeEquipmentId is an array
    const routeEquipmentIds = Array.isArray(routeEquipmentId)
      ? routeEquipmentId
      : [routeEquipmentId];

    const routeComponent = await prisma.routeComponent.findMany({
      where: {
        routeEquipmentId: { in: routeEquipmentIds as string[] },
      },
      select: {
        id: true,
        routeEquipmentId: true,
        component: {
          select: {
            name: true,
          },
        },
        comments: {
          take: 2,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            severity: true,
            comment: true,
            createdAt: true,
          },
        },
        recommendations: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            priority: true,
            recommendation: true,
            createdAt: true,
          },
        },
      },
    });

    console.log("Api data: ", routeComponent);

    return res.status(200).json({
      message: "Successfully fetched route components",
      data: routeComponent,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching route component:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
