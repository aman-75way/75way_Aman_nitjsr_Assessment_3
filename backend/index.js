import mongoose from "mongoose";
import express from 'express';
import {connectDB} from './db/connection.js'
import { User } from "./models/userSchema.js";
import cors from 'cors';
import { UserRegsiter } from "./controller/UserRegister.js";
import { validateSignUp } from "./middleware/signup-middleware.js";
import { validateLogin } from "./middleware/login-middleware.js";
import { GetChatDetails } from "./controller/GetChatDetails.js";
import { authMiddleware } from "./middleware/auth-middleware.js";
import { userLogin } from "./controller/UserLogin.js";
import { CreateChat } from "./controller/CreateChat.js";
import { fetchChatByUserIds } from "./controller/FetchData.js";
import { FetchChatMessage } from "./controller/fetchingChatMessage.js";
import { SendGroupMessage } from "./controller/groupChat/RetrieveGroupMessage.js";
import { UserList } from "./controller/UserList.js";

const app = express();
app.use(express.json());
connectDB();

const corsOptions = {
    origin: "*",
}

app.use(cors(corsOptions));



app.get('/' , (req,res)=>{
    res.send("Home page");
})


app.post('/api/register',  validateSignUp ,  UserRegsiter);
// app.post('/api/register',    UserRegsiter);

app.get('/api/users' , UserList);


app.post('/api/login',  validateLogin ,  userLogin);


app.get('/api/chat' , authMiddleware , GetChatDetails);


app.post('/api/chats' , CreateChat);


app.post('/api/createChat' , CreateChat);


app.get('/api/GetMessage' , fetchChatByUserIds);


app.post('/api/fetchChatMessage' , FetchChatMessage);


app.post('/api/group/sendMessage' , SendGroupMessage)


app.listen(5000 , (req,res)=>{
    console.log("server is listening at port - 5000");
})