import express from "express";
import mongoose from "mongoose";
import { HttpError } from "http-errors"
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import VideoStreamingRoutes from "./routes";
import swaggerDocs from "./utils/swagger";

dotenv.config();


const app = express();

const PORT = process.env.PORT

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

app.use('/api/v1', VideoStreamingRoutes);

mongoose.connect(`${process.env.MONGODB_CONN}`).then(()=>{
    console.log(`Database is connected !`)
    swaggerDocs(app, 7500);
    
}).catch((error: HttpError ) => {
    console.log(`Database error at ${error}`)
});


app.listen(PORT || 3000 , () =>{
    console.log(`App running at ${PORT}`)
})


export default app;