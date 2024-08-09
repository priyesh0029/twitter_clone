import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes/indexRoute.js";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";
import AppError from "./utilities/appError.js";
import { v2 as cloudinary } from "cloudinary";
import knex from "./config/knex.js";



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


app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});


//db config
//knex.once connected
knex.raw('SELECT 1+1 as result').then(() => {
  console.log('connected to database');
}).catch((err) => {
  console.log(err);
  process.exit(1);
});



app.use(errorHandlingMiddleware) 

app.all('*', (req,res,next) => {
    next(new AppError('Not found', 404));
});