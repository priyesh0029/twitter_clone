import { userController } from "../controllers/userController.js";
import { uploadTwitterProImg } from "../middlewares/multer.js";



const userRouter = (router)=>{
    router.get('/who-to-follow',userController.getWhoToFollow)
    router.post('/hanlde-follow',userController.handleFollowUnfollow)
    router.get('/hanlde-profile/:userId',userController.handleProfile)
    // router.post('/change-display-image',uploadTwitterProImg,userController.changepropic)


   
    return router;
}

export default userRouter