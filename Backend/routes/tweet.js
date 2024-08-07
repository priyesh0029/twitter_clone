import { tweetController } from "../controllers/tweetController.js";
import { uploadTwitterPosts } from "../middlewares/multer.js"


const tweetRouter = (router)=>{
    router.post('/create',uploadTwitterPosts,tweetController.createTweet)
    router.get('/tweets',tweetController.getAlltTweets)
    // router.patch('/updatepost',postController.updatePost)
    // router.patch('/deletePost',postController.deletePost)


    // router.post('/create',uploadTwitterPosts,(req,res)=> {
    //     console.log("body of create tweet : ",req.body);
    // })
   
    return router;
}

export default tweetRouter