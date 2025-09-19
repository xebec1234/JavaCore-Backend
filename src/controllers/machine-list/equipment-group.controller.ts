import prisma from "../../prisma/prisma";
import { Request, Response } from "express";

// CREATE Equipment Group
export const createEquipmentGroup = async (req: Request, res: Response) => {
  try {
    const { name, areaId } = req.body;

    if (!name || !areaId) {
      return res.status(400).json({
        message: "Name and areaId are required",
        success: false,
      });
    }

    const equipmentGroup = await prisma.equipmentGroup.create({
      data: {
        name,
        areaId,
      },
    });

    res.status(200).json({
      equipmentGroup,
      message: "Equipment Group Created Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error creating equipment group:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};

// GET Equipment Groups by Area
export const getEquipmentGroups = async (req: Request, res: Response) => {
  try {
    const { areaId } = req.query;

    if (!areaId) {
      return res.status(400).json({
        message: "Missing area ID",
        success: false,
      });
    }

    const equipmentGroups = await prisma.equipmentGroup.findMany({
      where: {
        areaId: String(areaId),
        isDelete: false,
      },
    });

    res.status(200).json({
      equipmentGroups,
      message: "Equipment Groups Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching equipment groups:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

// UPDATE Equipment Group
export const updateEquipmentGroup = async (req: Request, res: Response) => {
  try {
    const { id, name, isDelete, areaId } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Missing equipment group ID",
        success: false,
      });
    }

    await prisma.equipmentGroup.update({
      where: { id },
      data: {
        name,
        isDelete,
        areaId,
      },
    });

    res.status(200).json({
      message: "Equipment Group Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating equipment group:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

// DELETE Equipment Groups (soft delete Only)
export const deleteEquipmentGroups = async (req: Request, res: Response) => {
  try {
    const { id: ids } = req.body; 

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        message: "Invalid request, expected array of IDs",
        success: false,
      });
    }

    await prisma.equipmentGroup.updateMany({
      where: { id: { in: ids } },
      data: { isDelete: true },
    });

    res.status(200).json({
      message: "Equipment Groups Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting equipment groups:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};