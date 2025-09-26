import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { putObject } from "../../util/putObject"
import { deleteObject } from "../../util/deleteObject";
import path from "path";
import { v4 as uuid } from "uuid";

export const createEquipmentDrawing = async (req: Request, res: Response) => {
    try {
        const { clientId, componentId } = req.body

        const folder = "equipment-drawing/"

        if (!clientId || !componentId) {
            return res.status(400).json({ error: "clientId and componentId are required", success: false });
        }

        if (!req.files || !(req.files instanceof Array)) {
            return res.status(400).json({ message: "No files uploaded", success: false });
        }

        const files = req.files as Express.Multer.File[];

        await Promise.all(
            files.map(async (file) => {
                const ext = path.extname(file.originalname);
                const uniqueName = `${uuid()}${ext}`;

                const key = `${folder}${uniqueName}`

                const uploaded = await putObject(file.buffer, key, file.mimetype);

                return prisma.routeComponentImage.create({
                data: {
                    clientId,
                    componentId,
                    fileName: uploaded.key,
                    originalName: file.originalname,
                    fileUrl: uploaded.url,
                    fileSize: file.size,
                    fileType: file.mimetype,
                },
                });
            })
        );


        res.status(200).json({ message: "Equipment Drawing Created Successfully", success: true})
    } catch (error) {
        console.error("Error creating details:", error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const getEquipmentDrawing = async (req: Request, res: Response) => {
    try {
        const { componentId, clientId } = req.query;

        if (!componentId || typeof componentId !== "string") {
            return res.status(400).json({
                message: "Missing componentId",
                success: false,
            });
        }

        if (!clientId || typeof clientId !== "string") {
            return res.status(400).json({
                message: "Missing clientId",
                success: false,
            });
        }

        const equipmentDrawings = await prisma.routeComponentImage.findMany({
            where: {
                clientId,
                componentId
            },
            orderBy: {
                uploadedAt: "desc"
            },
            select: {
                fileUrl: true,
                fileName: true,
                id: true,
                originalName: true
            }
        })
        
        res.status(200).json({ equipments: equipmentDrawings, message: "Equipment Drawing Get Successfully", success: true})
    } catch (error) {
        console.error("Error creating details:", error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const deleteEquipmentDrawing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing drawing id", success: false });
    }

    const drawing = await prisma.routeComponentImage.findUnique({
      where: { id },
    });

    if (!drawing) {
      return res
        .status(404)
        .json({ message: "Drawing not found", success: false });
    }

    await deleteObject(drawing.fileName);

    await prisma.routeComponentImage.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "Equipment Drawing Deleted Successfully", success: true });
  } catch (error) {
    console.error("Error deleting details:", error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};
