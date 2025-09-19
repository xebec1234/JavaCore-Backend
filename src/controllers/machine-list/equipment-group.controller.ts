import prisma from "../../prisma/prisma";
import { Request, Response } from "express";

// CREATE Equipment Group
export const createEquipmentGroup = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;              