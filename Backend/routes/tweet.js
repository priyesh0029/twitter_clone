import { tweetController } from "../controllers/tweetController.js";
import { uploadTwitterPosts } from "../middlewares/multer.js"


const tweetRouter = (router)=>{
    router.post('/create',uploadTwitterPosts,tweetController.createTweet)
    router.get('/tweets',tweetController.getAllTweets)
   
    return router;
}

export default tweetRouter