import jwt from "jsonwebtoken";

export const isLogin = async (req, res, next) => {
    const bearerToken = req.header("Authorization");
    //console.log(bearerToken);
    if (!bearerToken)
        return res.status(401).json({ message: "No Token Provided" });
    try {
        const token = bearerToken.split(" ")[1];
        console.log(token);
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in isLogin:", error);
        return res.status(400).json({ message: "Invalid token" });
    }
}