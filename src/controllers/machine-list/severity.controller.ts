import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import jwt from "jsonwebtoken";

export const getAllSeverities = async (req: Request, res: Response) => {
    try {
        const severities = await prisma.routeComponentComment.groupBy({
            by: ["severity"],
            _count: { severity: true }
        })

        const severityCounts = severities.map((s) => ({
            severity: s.severity,
            count: s._count.severity,
        }));

        res.status(200).json({ data: severityCounts, message: "Get Severities Successfully ", success: true })
    } catch (error) {
        console.error("Error fetching counts:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const getSeverities = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token
        
        if (!token) {
            return res.status(400).json({ error: "Token Expired", success: false });
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (typeof decoded === "string") {
        return res
            .status(400)
            .json({ error: "Invalid Token Payload", success: false });
        }

        const routeComponents = await prisma.routeComponent.findMany({
            where: { clientId: decoded.id },
            select: { id: true },
        });

        const routeComponentIds = routeComponents.map((rc) => rc.id);

        const latestComments = await prisma.routeComponentComment.findMany({
            where: {
                routeComponentId: { in: routeComponentIds },
            },
            orderBy: { createdAt: "desc" },
            distinct: ["routeComponentId"],
            select: {
                severity: true,
            },
        });

        const allSeverities = ["Critical", "Normal", "Moderate", "Severe", "Missed Points"];

        const severityCounts = latestComments.reduce((acc, comment) => {
            acc[comment.severity] = (acc[comment.severity] || 0) + 1;
                return acc;
        }, {} as Record<string, number>);

        const severityCountsArray = allSeverities.map((severity) => ({
            severity,
            count: severityCounts[severity] || 0
        }));

        res.status(200).json({ data: severityCountsArray, message: "Get Severities Successfully ", success: true })
    } catch (error) {
        console.error("Error fetching counts:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}