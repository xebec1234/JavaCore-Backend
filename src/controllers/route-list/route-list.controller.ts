import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

// CREATE Route
export const createRoute = async (req: Request, res: Response) => {
  try {
    const { clientId, routeName, areaId, equipmentNames } = req.body;

    if (!clientId || !routeName || !areaId) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    // Create Route
    const newRoute = await prisma.routeList.create({
      data: {
        clientId,
        routeName,
        isUsed: false,
      },
    });

    // Create Machine
    const newMachine = await prisma.routeMachineList.create({
      data: {
        routeId: newRoute.id,
        areaId,
      },
    });

    // Create Equipments + Components
    for (const equipment of equipmentNames || []) {
      const newEquipment = await prisma.routeEquipmentName.create({
        data: {
          routeMachineId: newMachine.id,
          equipmentNameId: equipment.id,
        },
      });

      for (const componentId of equipment.components || []) {
        await prisma.routeComponent.create({
          data: {
            componentId,
            clientId: newRoute.clientId,
            routeMachineId: newMachine.id,
            routeEquipmentId: newEquipment.id,
          },
        });
      }
    }

    res.status(201).json({
      message: "Route Created Successfully",
      route: newRoute,
      success: true,
    });
  } catch (error) {
    console.error("Error creating route:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// GET Routes
export const getRoutes = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.query;

    if (!clientId || typeof clientId !== "string") {
      return res
        .status(400)
        .json({ message: "Missing clientId", success: false });
    }

    const routes = await prisma.routeList.findMany({
      where: {
        clientId,
        isUsed: false,
      },
    });

    res.status(200).json({
      routes,
      message: "Routes Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching routes:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
