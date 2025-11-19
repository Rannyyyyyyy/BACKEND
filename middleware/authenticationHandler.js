import jwt from "jsonwebtoken";
import * as UserModel from "../models/UserModel.js"; 

const checkToken = async (req, res, next) => {
    try {
        const authHeader = req.headers?.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "You don't have permission to access the app"
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        // Make sure SECRET is defined
        if (!process.env.SECRET) {
            return res.status(500).json({
                success: false,
                message: "Server secret not configured"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        const userId = decoded.id;

        const user = await UserModel.getUser(userId);
        if (!user || user.length === 0) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user[0].id;
        next(); 
    } catch (err) {
        console.log(err); // log exact error
        return res.status(401).json({
            success: false,
            message: "Request is unauthorized"
        });
    }
};

export default checkToken;
