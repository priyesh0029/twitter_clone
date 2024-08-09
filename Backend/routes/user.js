import { userController } from "../controllers/userController.js";
import { uploadTwitterProImg } from "../middlewares/multer.js";



const userRouter = (router)=>{
    router.get('/whotofollow',userController.getWhoToFollow)
    router.patch('/hanldefollow',userController.handleFollowUnfollow)
    router.get('/hanldeprofile/:userId',userController.handleProfile)
    // router.post('/changepropic',uploadTwitterProImg,userController.changepropic)


   
    return router;
}

export default userRouter