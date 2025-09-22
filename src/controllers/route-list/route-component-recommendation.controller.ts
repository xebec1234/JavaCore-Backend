import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const createRouteComponentRecommendation = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeComponentId, priority, recommendation } = req.body;
    if (!routeComponentId || !priority || !recommendation) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const newRecommendation = await prisma.routeComponentRecommendation.create({
      data: {
        routeComponentId,
        priority,
        recommendation,
      },
    });

    return res.status(201).json({
      message: "Recommendation created successfully",
      success: true,
      data: newRecommendation,
    });
  } catch (error) {
    console.error("Error creating recommendation:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// GET recommendation for a specific route component
export const getRouteComponentRecommendations = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeComponentId } = req.query;
    if (!routeComponentId || typeof routeComponentId !== "string") {
      return res
        .status(400)
        .json({ message: "Missing routeComponentId", success: false });
    }
    const recommendations = await prisma.routeComponentRecommendation.findMany({
      where: { routeComponentId: routeComponentId },
      take: 2,
      orderBy: { createdAt: "desc" },
      select: {
        priority: true,
        recommendation: true,
        createdAt: true,
      },
    });

    return res
      .status(200)
      .json({
        message: "Recommendations fetched successfully",
        success: true,
        data: recommendations,
      });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
