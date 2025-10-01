import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getRouteEquipment = async (req: Request, res: Response) => {
  try {
    const { routeMachineId } = req.query;

    if (!routeMachineId) {
      return res
        .status(400)
        .json({ message: "Missing routeMachineId", success: false });
    }

    const routeEquipment = await prisma.routeEquipmentName.findMany({
      where: {
        routeMachineId: String(routeMachineId),
      },
      select: {
        id: true,
        equipmentName: {
          select: {
            name: true,
            groupId: true,
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      message: "Successfully fetched route equipment",
      data: routeEquipment,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching route equipment:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
