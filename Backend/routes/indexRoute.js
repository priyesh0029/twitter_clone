import userAuthMiddleware from "../middlewares/authMiddleware.js";
import authRouter from "./auth.js";
import tweetRouter from "./tweet.js";

const routes = (app,router) => {
    app.use("/api/auth", authRouter(router));
    app.use("/api/tweet", userAuthMiddleware("user"), tweetRouter(router));
  };
  
  export default routes;