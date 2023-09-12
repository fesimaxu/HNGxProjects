import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import { HttpError } from 'http-errors';
import config from "./config";
import { db } from "./config/dbConfig";
import UserRoutes from "./routes/userRoutes";


const app = express();

const { PORT } = config;


db.sync({}).then(()=>{
    console.log(`Database is successfully connected`);
}).catch((error: HttpError)=>{
    console.log(`Database error at ${error}`)
})



const BUILD_PORT = PORT;


app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', UserRoutes);




app.listen( BUILD_PORT, ()=>{
    console.log(`app is listening at http://localhost:${BUILD_PORT}/`);
})




export default app;