import { Request, Response } from "express";
import prisma from "../prisma/prisma";

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
