import userAuthMiddleware from "../middlewares/authMiddleware.js";
import authRouter from "./auth.js";
import tweetRouter from "./tweet.js";
import userRouter from "./user.js";

const routes = (app,router) => {
    app.use("/api/auth", authRouter(router));
    app.use("/api/tweet", userAuthMiddleware("user"), tweetRouter(router));
    app.use("/api/user", userAuthMiddleware("user"), userRouter(router));

  };
  
  export default routes;