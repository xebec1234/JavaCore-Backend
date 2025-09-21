import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getRouteEquipmentList = async (req: Request, res: Response) => {
    try {
        const routeListId = req.query;

        if (!routeListId || typeof routeListId !== "string") {
            return res
                .status(400)
                .json({ message: "Missing routeListId", success: false });
        }

        const routeMachineList = await prisma.routeMachineList.findMany({
            where: {
                routeId: routeListId,
            },
            select: {
                id: true,
                routeEquipmentNames: {
                    select: {
                        id: true,
                        equipmentName: {
                            select: {
                                name: true,
                                group: {
                                    select: {
                                        id: true,
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json({
            routeMachineList,
            message: "Route Equipment List Fetched Successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error fetching route equipment list:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}