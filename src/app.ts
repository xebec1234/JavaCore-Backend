import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import jobRoute from "./routes/job.route";
import jobInspector from "./routes/job/job-inspector.route"

import areaRoute from "./routes/machine-list/area.route";
import machineListCountRoute from "./routes/machine-list/machine-list-count.route";
import equipmentGroupRoute from "./routes/machine-list/equipment-group.route";
import equipmentNameRoute from "./routes/machine-list/equipment-name.route";
import componentRoute from "./routes/machine-list/component.route";
import createRoute from "./routes/route-list/route-list.route";
import verifyRoute from "./routes/verify.route";
import jobNumberRoute from "./routes/job-number.route";
import recentRoutes from "./routes/route-list/recent-routes.route"
import equipmentListRoute from "./routes/route-list/route-equipment-list.route";
import conponentsRoute from "./routes/route-list/route-component.route";
import componentCommentRoute from "./routes/route-list/route-component-comment.routes";
import componentRecommendationRoute from "./routes/route-list/route-component-recommendation.route";
import componentClientAction from "./routes/route-list/component-client-action.route";
import componentAnalystNote from "./routes/route-list/component-analyst-note.route";
import componentTemperature from "./routes/route-list/component-temperature.route";
import componentOilAnalysis from "./routes/route-list/component-oil-analysis.route";
import componentEquipmentDrawing from "./routes/route-list/component-equipment-drawing.route"
import componentReportFigure from "./routes/route-list/component-report-figure.route"
import componentDetails from "./routes/route-list/component-details.route"
import reportequipment from "./routes/report/route-equipment.route";
import reportcomponent from "./routes/report/route-component.route";
import severity from "./routes/machine-list/severity.route"
import reportIntroduction from "./routes/report/report-introduction.route";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/job", jobRoute);
app.use("/api/job/job-inspector", jobInspector);
app.use("/api/user", userRoute);
app.use("/api/verify", verifyRoute);

app.use("/api/machine-list/severity", severity);
app.use("/api/machine-list/area", areaRoute);
app.use("/api/machine-list/machine-list-count", machineListCountRoute);
app.use("/api/machine-list/equipment-group", equipmentGroupRoute);
app.use("/api/machine-list/equipment-name", equipmentNameRoute);
app.use("/api/machine-list/component", componentRoute);
app.use("/api/route-list/route-list", createRoute);
app.use("/api/job-number", jobNumberRoute);
app.use("/api/route-list/recent-routes", recentRoutes);
app.use("/api/route-list/route-equipment-list", equipmentListRoute);
app.use("/api/route-list/route-component", conponentsRoute);
app.use("/api/route-list/route-component-comment", componentCommentRoute);
app.use(
  "/api/route-list/route-component-recommendation",
  componentRecommendationRoute
);
app.use("/api/route-list/component-client-action", componentClientAction);
app.use("/api/route-list/component-analyst-note", componentAnalystNote);
app.use("/api/route-list/component-temperature", componentTemperature);
app.use("/api/route-list/component-oil-analysis", componentOilAnalysis);
app.use("/api/route-list/component-equipment-drawing", componentEquipmentDrawing)
app.use("/api/route-list/component-report-figure", componentReportFigure)
app.use("/api/route-list/component-details", componentDetails);
app.use("/api/report/route-equipment", reportequipment);
app.use("/api/report/route-component", reportcomponent);
app.use("/api/report/report-introduction", reportIntroduction);

app.get("/sample", (req, res) => {
  res.json({ message: "test" }).status(200);
});

export default app
