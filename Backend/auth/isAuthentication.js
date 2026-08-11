import jwt from "jsonwebtoken";
import { response } from "../utils/response.js";
export const isAuthenticated = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json(response("token is missing", 401, null));
    }
    try{
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json(response(error.message, 401, null));
    }
}