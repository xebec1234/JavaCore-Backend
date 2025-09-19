import prisma from "../../prisma/prisma";
import { Request, Response } from "express";

// CREATE Area
export const createArea = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    await prisma.area.create({
      data: { name },
    });

    res
      .status(200)
      .json({ message: "Area Created Successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};

// GET all Areas
export const getAreas = async (req: Request, res: Response) => {
  try {
    const areas = await prisma.area.findMany({
      where: { isDelete: false },
      orderBy: { name: "asc" },
    });

    res.status(200).json({
      areas,
      message: "Areas Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};

// GET single Area by id
export const getAreaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const area = await prisma.area.findUnique({
      where: { id },
    });

    if (!area) {
      return res
        .status(404)
        .json({ message: "Area not found", success: false });
    }

    res
      .status(200)
      .json({ area, message: "Area Fetched Successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};

// UPDATE Area
export const updateArea = async (req: Request, res: Response) => {
  try {
    const { id, name, isDelete } = req.body;

    await prisma.area.update({
      where: { id },
      data: { name, isDelete },
    });

    res
      .status(200)
      .json({ message: "Area Updated Successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};

// DELETE Areas (soft delete Only)
export const deleteAreas = async (req: Request, res: Response) => {
  try {
    const { id: ids } = req.body;

    await prisma.area.updateMany({
      where: { id: { in: ids } },
      data: { isDelete: true },
    });

    res
      .status(200)
      .json({ message: "Areas Deleted Successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};
