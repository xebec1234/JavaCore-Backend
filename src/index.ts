import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import jobRoute from "./routes/job.route";

import areaRoute from "./routes/machine-list/area.route";
import machineListCountRoute from "./routes/machine-list/machine-list-count.route";
import equipmentGroupRoute from "./routes/machine-list/equipment-group.route";
import equipmentNameRoute from "./routes/machine-list/equipment-name.route";
import componentRoute from "./routes/machine-list/component.route";
import createRoute from "./routes/route-list/route-list.route";
import verifyRoute from "./routes/verify.route";
import jobNumberRoute from "./routes/job-number.route";
import getRouteEquipmentList from "./routes/route-list/route-equipment-list.route";
import getRouteComponents from "./routes/route-list/route-component.route";
import getRouteComponentComments from "./routes/route-list/route-component-comment.routes";

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
app.use("/api/user", userRoute);
app.use("/api/verify", verifyRoute);

app.use("/api/machine-list/area", areaRoute);
app.use("/api/machine-list/machine-list-count", machineListCountRoute);
app.use("/api/machine-list/equipment-group", equipmentGroupRoute);
app.use("/api/machine-list/equipment-name", equipmentNameRoute);
app.use("/api/machine-list/component", componentRoute);
app.use("/api/route-list/route-list", createRoute);
app.use("/api/job-number", jobNumberRoute);
app.use("/api/route-list/route-equipment-list", getRouteEquipmentList);
app.use("/api/route-list/route-component", getRouteComponents);
app.use("/api/route-list/route-component-comment", getRouteComponentComments);

app.get("/sample", (req, res) => {
  res.json({ message: "test" }).status(200);
});

app
  .listen(port, () => {
    console.log(`Server running on port: ${port}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
