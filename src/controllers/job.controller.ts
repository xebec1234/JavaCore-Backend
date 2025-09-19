import prisma from "../prisma/prisma"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createJob = async (req: Request, res: Response) => {
    try {
        
        const {
            client,
            area,
            dateSurveyed,  
            jobNo,
            poNo,
            woNo,
            reportNo,
            jobDescription,
            method,
            inspector,
            inspectionRoute,
            equipmentUse,
            dateRegistered,
            yearWeekNo,
        } = req.body;

        await prisma.job.create({
            data: {
                userId: client,
                area,
                dateSurveyed,
                jobNumber: jobNo,
                poNumber: poNo,
                woNumber: woNo,
                reportNumber: reportNo,
                jobDescription,
                method,
                inspector,
                inspectionRoute,
                equipmentUse,
                dateRegistered,
                yearWeekNumber: yearWeekNo,
            },
        })

        res.status(200).json({ message: "Job Created Successfully", success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: {
                no: "asc",
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        }) 

        res.status(200).json({jobs, message: "Jobs Fetched Successfully", success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const getJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const job = await prisma.job.findUnique({
            where: {
                id
            }
        })

        res.status(200).json({job, message: "Job Fetched Successfully", success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const updateJob = async (req: Request, res: Response) => {
    try {
        const { status, analyst, reviewer, id } = req.body;

        const dateFinished = status === "Report Submitted" ? new Date() : undefined;

        await prisma.job.update({
            where: {
                id
            },
            data: {
                status,
                analyst,
                reviewer,
                dateFinished
            }
        })

        res.status(200).json({ message: "Job Updated Successfully", success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const deleteJobs = async (req: Request, res: Response) => {
    try {
        const { id: ids } = req.body;

        await prisma.job.deleteMany({
            where: {
                id: {
                    in: ids,
                }
            },
        })

        res.status(200).json({ message: "Jobs Deleted Successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const getUserJobs = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        if (!token) {
          return res.status(400).json({ error: "Token Expired", success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (typeof decoded === "string") {
        return res
            .status(400)
            .json({ error: "Invalid Token Payload", success: false });
        }

        const jobs = await prisma.job.findMany({
            orderBy: {
                no: "asc",
            },
            where: {
                userId: decoded.id
            },
        })

        res.status(200).json({jobs, message: "Jobs Fetched Successfully", success: true})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}