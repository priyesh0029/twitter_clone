import AppError from "../utilities/appError.js";
import { authServices } from "./authServices.js";

const userAuthMiddleware = (requiredRole) => {
    return (req, res, next) => {
        // Read token from cookies
        let token = req.cookies.token;

        console.log("Entered middleware",token);

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
          ) {
            token = req.headers.authorization.split(" ")[1];
            token = token.replace(/"/g, ""); 
          }
      

        if (!token) {
            throw new AppError("Token not found", 401);
        }

        try {
            // Verify token
            const { payload } = authServices.verifyToken(token);
            console.log("Verified token:", payload);

            const { id, role } = payload;
            req.query.userId = id;
            console.log("Verified token id:", req.query.userId);

            // Check if the user has the required role
            if (role === requiredRole) {
                next();
            } else {
                throw new AppError("Unauthorized user", 403);
            }

        } catch (error) {
            console.log(error);
            throw new AppError("Unauthorized user", 401);
        }
    };
};

export default userAuthMiddleware;
