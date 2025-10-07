import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    device: z.string().min(1, "Device is required"),
  })
  .strict();

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

export const commentSchema = z.object({
  routeComponentId: z.string(),
  severity: z.string().min(1, "Severity is required"),
  comment: z.string().min(1, "Comment is required"),
});

export const recommendationSchema = z.object({
  routeComponentId: z.string(),
  priority: z.string().min(1, "Priority is required"),
  recommendation: z.string().min(1, "Recommendation is required"),
});

export const createAnalystNoteSchema = z.object({
  routeComponentId: z.string().min(1, "Component ID is required"),
  note: z.string().min(1, "Note is required"),
  analyst: z.string().min(1, "Analyst is required"),
});

export const createActionSchema = z.object({
  routeComponentId: z.string().min(1, "Component ID is required"),
  action: z.string().min(1, "Action is required"),
  woNumber: z.string().min(1, "WO Number is required"),
});

export const temperatureSchema = z.object({
  routeComponentId: z.string(),
  temperature: z
    .number()
    .min(-100, { message: "Temperature cannot be below -100°C" })
    .max(1000, { message: "Temperature cannot exceed 1000°C" }),
});

export const oilAnalysisSchema = z.object({
  routeComponentId: z.string(),
  analysis: z
    .enum(["Normal", "Moderate", "Severe", "Critical", "Missed Points"])
    .describe("Choose a valid oil state!"),
});

export const detailschema = z.object({
  id: z.string().min(1, "id is required"),
  clientId: z.string(),
  routeComponentId: z.string(),
  header: z.string().min(1, "Header is required"),
  value: z.string().min(1, "Value is required"),
});
