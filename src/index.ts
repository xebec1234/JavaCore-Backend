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

app.use("/api/machine-list/area", areaRoute);
app.use("/api/machine-list/machine-list-count", machineListCountRoute);
app.use("/api/machine-list/equipment-group", equipmentGroupRoute);
app.use("/api/machine-list/equipment-name", equipmentNameRoute);
app.use("/api/machine-list/component", componentRoute);

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
