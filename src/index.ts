import express from "express"
import userRoute from "./routes/auth.route"

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.use("/api/user", userRoute);

app.get('/sample', (req, res) => {
    res.json({ message: "test"}).status(200)
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})