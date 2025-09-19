import prisma from "../../prisma/prisma";
import { Request, Response } from "express";

// CREATE Component
export const createComponent = async (req: Request, res: Response) => {
  try {
    const { name, equipmentNameId } = req.body;

    if (!name || !equipmentNameId) {
      return res.status(400).json({
        message: "Name and equipmentNameId are required",
        success: false,
      });
    }

    const component = await prisma.component.create({
      data: {
        name,
        equipmentNameId,
      },
    });

    res.status(200).json({
      component,
      message: "Component Created Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error creating component:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

// GET Components
export const getComponents = async (req: Request, res: Response) => {
  try {
    const { equipmentNameId } = req.query;

    if (!equipmentNameId) {
      return res.status(400).json({
        message: "Missing equipmentNameId",
        success: false,
      });
    }

    const components = await prisma.component.findMany({
      where: {
        equipmentNameId: String(equipmentNameId),
        isDelete: false,
      },
    });

    res.status(200).json({
      components,
      message: "Components Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching components:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

// UPDATE Component
export const updateComponent = async (req: Request, res: Response) => {
  try {
    const { id, name, isDelete, equipmentNameId } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Missing component ID",
        success: false,
      });
    }

    await prisma.component.update({
      where: { id },
      data: {
        name,
        isDelete,
        equipmentNameId,
      },
    });

    res.status(200).json({
      message: "Component Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating component:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

// DELETE Components
export const deleteComponents = async (req: Request, res: Response) => {
  try {
    const { id: ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        message: "Invalid request, expected array of IDs",
        success: false,
      });
    }

    await prisma.component.deleteMany({
      where: { id: { in: ids } },
    });

    res.status(200).json({
      message: "Components Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting components:", error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};
