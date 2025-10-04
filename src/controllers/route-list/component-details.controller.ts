import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { createDetailschema } from "../../types/validator";
import z from "zod";

export const createRouteComponentDetails = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body);
    const parsed = createDetailschema.parse(req.body);
    const { routeComponentId, clientId, header, value } = parsed;

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

    return res.status(201).json({
      message: "Details added successfully",
      data: newDetails,
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Invalid Data Input",
      });
    }
    console.error("Error creating details:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Get
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

// Update
export const updateRouteComponentDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { header, value } = req.body;

    if (!header && !value) {
      return res.status(400).json({
        message: "Nothing to update",
        success: false,
      });
    }

    const updated = await prisma.routeComponentDetails.update({
      where: { id },
      data: {
        ...(header && { header }),
        ...(value && { value }),
      },
    });

    return res.status(200).json({
      message: "Details updated successfully",
      data: updated,
      success: true,
    });
  } catch (error) {
    console.error("Error updating details:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Delete
export const deleteRouteComponentDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.routeComponentDetails.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Details deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting details:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
