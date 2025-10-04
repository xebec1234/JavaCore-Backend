import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { createCommentSchema } from "../../types/validator";
import z from "zod";

// Adding new comment to specific routecomponent
export const createRouteComponentComment = async (
  req: Request,
  res: Response
) => {
  try {
    const parsed = createCommentSchema.parse(req.body);
    const { routeComponentId, severity, comment } = parsed;

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
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Invalid Data Input",
      });
    }
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

// UPDATE latest comment to specific routecomponent
export const updateLatestRouteComponentComment = async (
  req: Request,
  res: Response
) => {
  try {
    const parsed = createCommentSchema.parse(req.body);
    const { routeComponentId, severity, comment } = parsed;

    const latestComment = await prisma.routeComponentComment.findFirst({
      where: { routeComponentId },
      orderBy: { createdAt: "desc" },
    });

    if (!latestComment) {
      return res.status(404).json({
        message: "No comments found for this route component",
        success: false,
      });
    }

    // Update the latest comment
    const updatedComment = await prisma.routeComponentComment.update({
      where: { id: latestComment.id },
      data: {
        severity,
        comment,
        createdAt: new Date(),
      },
    });

    return res.status(200).json({
      message: "Latest comment updated successfully",
      data: updatedComment,
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Invalid Data Input",
      });
    }
    console.error("Error updating latest comment:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
