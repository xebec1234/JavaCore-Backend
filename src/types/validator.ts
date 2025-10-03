import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  device: z.string().min(1, "Device is required")
}).strict();

export const createJobSchema = z.object({
  client: z.string().min(1, "Client (userId) is required"),
  area: z.string().min(1, "Area is required"),
  dateSurveyed: z.coerce.date({ message: "Invalid date for dateSurveyed" }),
  jobNo: z.string().min(1, "Job number is required"),
  poNo: z.string().optional(),
  woNo: z.string().optional(),
  reportNo: z.string().optional(),
  jobDescription: z.string().min(1, "Job description is required"),
  method: z.string().min(1, "Method is required"),
  inspector: z.string().optional(),
  inspectionRoute: z.string().min(1, "Inspection route is required"),
  equipmentUse: z.string().min(1, "Equipment use is required"),
  dateRegistered: z.coerce.date().optional(),
  yearWeekNo: z.string().min(1, "Year-week number is required"),
});