import prisma from "../../prisma/prisma";
import { Request, Response } from "express";

export const getInspector = async (req: Request, res: Response) => {
  try {
    const inspectors = await prisma.inspector.findMany({
      orderBy: {
        inspector: "asc", 
      },
    });

    res.status(200).json({
      inspectors,
      message: "Inspectors Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching inspectors:", error);
    res.status(500).json({ message: "Failed to fetch inspectors" });
  }
};

export const createInspector = async (req: Request, res: Response) => {
  try {
    const { inspector } = req.body;

    if (!inspector || typeof inspector !== "string") {
      return res.status(400).json({ message: "Inspector name is required" });
    }

    const newInspector = await prisma.inspector.create({
      data: {
        inspector,
      },
    });

    res.status(201).json({
      message: "Inspector created successfully",
      inspector: newInspector,
    });
  } catch (error) {
    console.error("Error creating inspector:", error);
    res.status(500).json({ message: "Failed to create inspector" });
  }
};

export const deleteInspectors = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body; 

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Inspector IDs are required" });
    }

    const existingInspectors = await prisma.inspector.findMany({
      where: { id: { in: ids } },
    });

    if (existingInspectors.length === 0) {
      return res.status(404).json({ message: "No inspectors found" });
    }

    await prisma.inspector.deleteMany({
      where: { id: { in: ids } },
    });

    res.status(200).json({
      message: "Inspectors deleted successfully",
      deletedCount: existingInspectors.length,
    });
  } catch (error) {
    console.error("Error deleting inspectors:", error);
    res.status(500).json({ message: "Failed to delete inspectors" });
  }
};
