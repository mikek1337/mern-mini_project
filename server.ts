import express,{Express} from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

if(process.env.JWT_SECRET === undefined){
    console.error('JWT_SECRET must be defined');
    process.exit(1);
}

const app:Express = express();


//get routers from  router folder
if(process.env.MONGO_URI === undefined){
    console.error('MONGO_URI must be defined');
    process.exit(1);
}
mongoose.connect(process.env.MONGO_URI);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods:['POST', 'GET', 'PUT'],
    maxAge:86400

}));
app.use("/", router);
const port = process.env.PORT || 3000;



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})