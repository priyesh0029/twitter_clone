import { authControllers } from "../controllers/authController.js";


const authRouter = (router) => {
    router.post('/signup', authControllers.registerUser)
    router.post('/login', authControllers.loginUser)

    return router
};

export default authRouter;