import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes/indexRoute.js";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";
import AppError from "./utilities/appError.js";
import { v2 as cloudinary } from "cloudinary";
import sequelize from "./config/dbConfig.js";
import User from "./models/User.js";
import Tweet from './models/Tweet.js';



const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
routes(app,express.Router());

cloudinary.config({
  cloud_name: "dsinpyvxb",
  api_key: "684988441571688",
  api_secret: "khe2yZ1Pack2_JqCNCw-fv03aNI",
});

dotenv.config();
const PORT = process.env.PORT;

//db config

sequelize.sync()
.then(() => {
  console.log('Database & tables created!');
})
.catch(error => {
  console.error('Error creating database & tables:', error);
});

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});


app.use(errorHandlingMiddleware) 

app.all('*', (req,res,next) => {
    next(new AppError('Not found', 404));
});