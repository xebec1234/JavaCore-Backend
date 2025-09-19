import prisma from "../../prisma/prisma";
import { Request, Response } from "express";

// GET Counts Of All Machine List Entities
export const getCounts = async (req: Request, res: Response) => {
  try {
    const [areas, equipmentGroup, equipmentName, components] =
      await prisma.$transaction([
        prisma.area.count(),
        prisma.equipmentGroup.count(),
        prisma.equipmentName.count(),
        prisma.component.count(),
      ]);

    res.status(200).json({
      areas,
      equipmentGroup,
      equipmentName,
      components,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
