import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getSeverities = async (req: Request, res: Response) => {
  try {
    const severities = await prisma.routeComponentComment.groupBy({
      by: ["severity"],
      _count: { severity: true },
    });

    const severityCounts = severities.map((s) => ({
      severity: s.severity,
      count: s._count.severity,
    }));

    return res.json({ success: true, severity: severityCounts });
  } catch (error) {
    console.error("Error fetching component severities:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
