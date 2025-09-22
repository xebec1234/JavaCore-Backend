const verifyAccount = async (req, res, next) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(401).json({ error: "Unauthorized", success: false });
        }

        if (!user.emailVerified) {
            return res.status(401).json({ error: "Email not verified", success: false });
        }

        if (!user.deviceVerified) {
            return res.status(401).json({ error: "Device not verified", success: false });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export default verifyAccount;