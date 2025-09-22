import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const createRouteComponentDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { clientId, componentId, header, value } = req.body;

    if (!clientId || !componentId || !header || !value) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const newDetails = await prisma.routeComponentDetails.create({
      data: {
        clientId,
        componentId,
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

export const getRouteComponentDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { componentId, clientId } = req.query;

    if (!componentId || typeof componentId !== "string") {
      return res.status(400).json({
        message: "Missing componentId",
        success: false,
      });
    }

    if (!clientId || typeof clientId !== "string") {
      return res.status(400).json({
        message: "Missing clientId",
        success: false,
      });
    }

    const routeComponentDetails = await prisma.routeComponentDetails.findMany({
      where: {
        componentId,
        clientId,
      },
      select: {
        id: true,
        header: true,
        value: true,
      },
    });

    return res.status(200).json({
      message: "Fetched success",
      data: routeComponentDetails,
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
