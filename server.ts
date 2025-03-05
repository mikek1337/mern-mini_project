import express,{Express} from 'express';
import dotenv from 'dotenv';
import router from './routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
dotenv.config();

if(process.env.JWT_SECRET === undefined){
    console.error('JWT_SECRET must be defined');
    process.exit(1);
}

const app:Express = express();

//get routers from  router folder
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mini-ticket")
app.use("/", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const port = process.env.PORT || 3000;



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})