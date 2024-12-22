import jwt from 'jsonwebtoken'
import 'dotenv'
import sendResponse from '../helper/sendResponse.js';
import User from '../models/User.js';

export async function authenticateUser(req, res, next) {
    try {
        const bearerToken = req?.headers?.authorization;
        const token = bearerToken?.split(" ")[1];
        if (!token) return sendResponse(res, 403, true, null, "Token Not Access");

        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        if (decoded) {
            const user = await User.findById(decoded._id)
            if (!user) return sendResponse(res, 403, true, null, "Token Not Found");
            req.user = decoded;
            next();
        } else {
            sendResponse(res, 500, true, null, "Something Went Wrong")
        }
    }
    catch (error) {
        sendResponse(res, 500, true, null, "Something Went Wrong")
    }
}
