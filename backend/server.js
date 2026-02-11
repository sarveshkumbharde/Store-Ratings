import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { testDB } from './config/db.js';
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import ownerRouter from './routes/owner.routes.js'

dotenv.config();
const app = express();
testDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(cookieParser())

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/owner', ownerRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is running");
})