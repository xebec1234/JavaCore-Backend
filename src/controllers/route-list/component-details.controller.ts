import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import jwt from "jsonwebtoken";

export const createRouteComponentDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { componentId, header, value } = req.body;
    console.log("req.body:", req.body);
    if (!componentId || !header || !value) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const routeComponent = await prisma.routeComponent.findUnique({
      where: { id: componentId },
      include: { component: true },
    });

    const componentExists = await prisma.component.findUnique({
      where: { id: routeComponent.componentId },
    });

    if (!componentExists) {
      return res.status(400).json({
        message: "Invalid componentId: component does not exist",
        success: false,
      });
    }

    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "Token Expired", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

    if (typeof decoded === "string" || !decoded || !("id" in decoded)) {
      return res
        .status(400)
        .json({ message: "Invalid Token Payload", success: false });
    }

    const newDetails = await prisma.routeComponentDetails.create({
      data: {
        clientId: (decoded as any).id,
        routeComponentId: routeComponent.componentId,
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
    const { componentId } = req.query;

    if (!componentId || typeof componentId !== "string") {
      return res.status(400).json({
        message: "Missing componentId",
        success: false,
      });
    }

    const routeComponent = await prisma.routeComponent.findUnique({
      where: { id: componentId },
      include: { component: true },
    });

    const componentDetails = await prisma.routeComponentDetails.findMany({
      where: {
        id: routeComponent.component.id,
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
