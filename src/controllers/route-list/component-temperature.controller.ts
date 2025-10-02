import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const createRouteComponentTemperature = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeComponentId, temperature } = req.body;

    if (!routeComponentId || !temperature) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const newTemperature = await prisma.routeComponentTemperature.create({
      data: {
        routeComponentId,
        temperature,
      },
    });

    return res.status(201).json({
      message: "Temperature added successfully",
      data: newTemperature,
      success: true,
    });
  } catch (error) {
    console.error("Error creating temperature:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// GET Fetch temperatures for a specific route component
export const getRouteComponentTemperatures = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeComponentId } = req.query;

    if (!routeComponentId || typeof routeComponentId !== "string") {
      return res.status(400).json({
        message: "Missing routeComponentId",
        success: false,
      });
    }

    const temperatures = await prisma.routeComponentTemperature.findMany({
      where: {
        routeComponentId,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        temperature: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      message: "Temperatures successfully fetched",
      data: temperatures,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching temperatures:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// UPDATE latest temperature to specific routecomponent
export const updateLatestRouteComponentTemperature = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeComponentId, temperature } = req.body;

    if (!routeComponentId || !temperature) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const latestTemperature = await prisma.routeComponentTemperature.findFirst({
      where: { routeComponentId },
      orderBy: { createdAt: "desc" },
    });

    if (!latestTemperature) {
      return res.status(404).json({
        message: "No temperature found for this route component",
        success: false,
      });
    }

    // Update the latest temperature
    const updatedTemperature = await prisma.routeComponentTemperature.update({
      where: { id: latestTemperature.id },
      data: {
        temperature,
        createdAt: new Date(), 
      },
    });

    return res.status(200).json({
      message: "Latest temperature updated successfully",
      data: updatedTemperature,
      success: true,
    });
  } catch (error) {
    console.error("Error updating latest temperature:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


