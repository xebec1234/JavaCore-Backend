import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import jwt from "jsonwebtoken";

// Search Job Number
export const getJobsBySearch = async (req: Request, res: Response) => {
  try {
    const { searchJob } = req.query;
    const jobs = await prisma.job.findMany({
      where: {
        jobNumber: { contains: searchJob as string },
      },
      select: {
        area: true,
        jobNumber: true,
        yearWeekNumber: true,
        reviewer: true,
        poNumber: true,
        woNumber: true,
        reportNumber: true,
        dateSurveyed: true,
        jobDescription: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        inspectionRoute: true,
        routeList: {
          select: {
            routeName: true,
            machines: {
              select: { id: true },
              take: 1,
            },
          },
        },
        reportIntroduction: true,
      },
    });

    return res
      .status(200)
      .json({ jobs, message: "Jobs Fetched Successfully", success: true });
  } catch (error) {
    console.error("Error getting jobs:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Search client jobs (new)
export const getClientJobsBySearch = async (req: Request, res: Response) => {
    try {
    const { searchJob } = req.query;

    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token Expired", success: false });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

    if (typeof decoded === "string" || !decoded || !("id" in decoded)) {
      return res
        .status(400)
        .json({ message: "Invalid Token Payload", success: false });
    }

    const jobs = await prisma.job.findMany({
      where: {
        jobNumber: { contains: searchJob as string },
        userId: (decoded as any).id,
      },
      select: {
        area: true,
        jobNumber: true,
        yearWeekNumber: true,
        reviewer: true,
        poNumber: true,
        woNumber: true,
        reportNumber: true,
        dateSurveyed: true,
        jobDescription: true,
        user: {
          select: { id: true, name: true },
        },
        inspectionRoute: true,
        routeList: {
          select: {
            routeName: true,
            machines: { select: { id: true }, take: 1 },
          },
        },
        reportIntroduction: true,
      },
    });

    return res.status(200).json({
      jobs,
      message: "Jobs Fetched Successfully by report number",
      success: true,
    });
  } catch (error) {
    console.error("Error getting jobs by report number:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
