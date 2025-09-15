import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import compression from "compression"
import cookieParser from "cookie-parser"

import userRoute from "./routes/auth.route"

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(helmet())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());

app.use("/api/user", userRoute);

app.get('/sample', (req, res) => {
    res.json({ message: "test"}).status(200)
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
}).on("error", (err) => {
  console.error("Failed to start server:", err);
});
