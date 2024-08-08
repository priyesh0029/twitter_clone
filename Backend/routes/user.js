import { userController } from "../controllers/userController.js";



const userRouter = (router)=>{
    router.get('/whotofollow',userController.getWhoToFollow)
    router.patch('/hanldefollow',userController.handleFollowUnfollow)
    router.get('/hanldeprofile/:userId',userController.hanldeProfile)

   
    return router;
}

export default userRouter