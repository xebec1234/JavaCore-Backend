import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const postReportIntroduction = async (req: Request, res: Response) => {
  try {
    const { jobNumber, introduction } = req.body;

    if (!jobNumber || !introduction) {
      return res.status(400).json({
        message: "Missing jobNumber or introduction",
        success: false,
      });
    }

    const reportIntroduction = await prisma.job.update({
      where: { jobNumber },
      data: { reportIntroduction: introduction },
    });

    return res.status(200).json({
      message: "Report introduction added successfully",
      success: true,
      job: reportIntroduction,
    });
  } catch (error) {
    console.error("Error updating report introduction:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
