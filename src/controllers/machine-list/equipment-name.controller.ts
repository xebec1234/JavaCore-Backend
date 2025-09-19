import prisma from "../../prisma/prisma";
import { Request, Response } from "express";

// CREATE Equipment Name
export const createEquipmentName = async (req: Request, res: Response) => {
  try {
    const { name, groupId } = req.body;

    if (!name || !groupId) {
      return res.status(400).json({
        message: "Name and groupId are required",
        success: false,
      });
    }

    const equipmentName = await prisma.equipmentName.create({
      data: {
        name,
        groupId,
      },
    });

    res.status(200).json({
      equipmentName,
      message: "Equipment Name Created Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error creating equipment name:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

// GET Equipment Names
export const getEquipmentNames = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.query;

    if (!groupId) {
      return res.status(400).json({
        message: "Missing groupId",
        success: false,
      });
    }

    const equipmentNames = await prisma.equipmentName.findMany({
      where: {
        groupId: String(groupId),
        isDelete: false,
      },
    });

    res.status(200).json({
      equipmentNames,
      message: "Equipment Names Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching equipment names:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

// UPDATE Equipment Name
export const updateEquipmentName = async (req: Request, res: Response) => {
  try {
    const { id, name, isDelete, groupId } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Missing equipment name ID",
        success: false,
      });
    }

    await prisma.equipmentName.update({
      where: { id },
      data: {
        name,
        isDelete,
        groupId,
      },
    });

    res.status(200).json({
      message: "Equipment Name Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating equipment name:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

// DELETE Equipment Names 
export const deleteEquipmentNames = async (req: Request, res: Response) => {
  try {
    const { id: ids } = req.body; 

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        message: "Invalid request, expected array of IDs",
        success: false,
      });
    }

    await prisma.equipmentName.deleteMany({
      where: { id: { in: ids } },
    });

    res.status(200).json({
      message: "Equipment Names Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting equipment names:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};
