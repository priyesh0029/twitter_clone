import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const tweets = {
  cloudinary: cloudinary,
  params: {
    folder: "twitter_posts",
    allowed_formats: ["jpg", "jpeg", "png", "svg", "webp","gif"],
    public_id: (req, file) => {
      console.log(file, "fileisssss");
      const originalname = file.originalname.split(".");
      return `image-${Date.now()}-${originalname[0]}`;
    },
  },
};

const userProImg = {
  cloudinary: cloudinary,
  params: {
    folder: 'twitter_user_img',
    allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
    public_id: (req, file) => {
      console.log(file, 'twitter_user_img file');
      const originalname = file.originalname.split('.');
      return `twitter_user_img-${Date.now()}-${originalname[0]}`;
    }
  }
};


const twitterPosts = new CloudinaryStorage(tweets);
const twitterProImg = new CloudinaryStorage(userProImg);

const uploadTwitterPosts = multer({ storage: twitterPosts }).array("image", 5);
const uploadTwitterProImg = multer({ storage: twitterProImg }).single('image');


export { uploadTwitterPosts,uploadTwitterProImg};
