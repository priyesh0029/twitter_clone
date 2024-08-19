import { authControllers } from "../controllers/authController.js";


const authRouter = (router) => {
    router.post('/signup', authControllers.registerUser)
    router.post('/login', authControllers.loginUser)
    router.post('/logout', authControllers.logoutUser)

    return router
};

export default authRouter;