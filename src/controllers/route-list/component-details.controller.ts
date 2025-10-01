import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const createRouteComponentDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeComponentId, clientId, header, value } = req.body;
    console.log("req.body:", req.body);
    if (!clientId || !header || !value) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const routeComponent = await prisma.routeComponent.findUnique({
      where: { id: routeComponentId },
    });

    if (!routeComponent) {
      return res.status(400).json({
        message: "Invalid routeComponentId: route component does not exist",
        success: false,
      });
    }

    const newDetails = await prisma.routeComponentDetails.create({
      data: {
        clientId: clientId,
        routeComponentId: routeComponentId,
        header,
        value,
      },
    });

    console.log("Created data:", newDetails);

    return res.status(201).json({
      message: "Details added successfully",
      data: newDetails,
      success: true,
    });
  } catch (error) {
    console.error("Error creating details:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getRouteComponentDetails = async (req: Request, res: Response) => {
  try {
    const { routeComponentId } = req.query;

    if (!routeComponentId || typeof routeComponentId !== "string") {
      return res.status(400).json({
        message: "Missing componentId",
        success: false,
      });
    }

    const componentDetails = await prisma.routeComponentDetails.findMany({
      where: {
        routeComponentId: routeComponentId,
      },
      select: {
        id: true,
        header: true,
        value: true,
      },
    });

    return res.status(200).json({
      message: "Fetched success",
      data: componentDetails,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching route component details:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
