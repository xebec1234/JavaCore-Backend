import jwt from "jsonwebtoken"

const verifyToken = (req,res,next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Authorization token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}

export default verifyToken