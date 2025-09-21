import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const createRouteComponentComment = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeComponentId, severity, comment } = req.body;

    if (!routeComponentId || !severity || !comment) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const newComment = await prisma.routeComponentComment.create({
      data: {
        routeComponentId,
        severity,
        comment,
      },
    });

    return res.status(201).json({
      message: "Comment added successfully",
      data: newComment,
      success: true,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// GET comments for a specific route component
export const getRouteComponentComments = async (
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

    const comments = await prisma.routeComponentComment.findMany({
      where: {
        routeComponentId,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        severity: true,
        comment: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      message: "Comments successfully fetched",
      data: comments,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
