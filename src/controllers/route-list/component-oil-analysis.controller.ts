import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const createRouteComponentOilAnalysis = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeComponentId, analysis } = req.body;

    if (!routeComponentId || !analysis) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const newOilAnalysis = await prisma.routeComponentOilAnalysis.create({
      data: {
        routeComponentId,
        analysis,
      },
    });

    return res.status(201).json({
      message: "Oil Analysis added successfully",
      data: newOilAnalysis,
      success: true,
    });
  } catch (error) {
    console.error("Error creating oil analysis:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// GET Fetch oil analyses for a specific route component
export const getRouteComponentOilAnalyses = async (
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

    const oilAnalyses = await prisma.routeComponentOilAnalysis.findMany({
      where: {
        routeComponentId,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        analysis: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      message: "Oil analyses successfully fetched",
      data: oilAnalyses,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching oil analyses:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// UPDATE latest Oil Analysis to specific routecomponent
export const updateLatestRouteComponentOilAnalyses = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeComponentId, analysis } = req.body;

    if (!routeComponentId || !analysis) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const latestOilAnalysis = await prisma.routeComponentOilAnalysis.findFirst({
      where: { routeComponentId },
      orderBy: { createdAt: "desc" },
    });

    if (!latestOilAnalysis) {
      return res.status(404).json({
        message: "No oil analysis found for this route component",
        success: false,
      });
    }

    // Update the latest temperature
    const updatedOilAnalysis = await prisma.routeComponentOilAnalysis.update({
      where: { id: latestOilAnalysis.id },
      data: {
        analysis,
        createdAt: new Date(), 
      },
    });

    return res.status(200).json({
      message: "Latest oil analysis updated successfully",
      data: updatedOilAnalysis,
      success: true,
    });
  } catch (error) {
    console.error("Error updating latest oil analysis:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
