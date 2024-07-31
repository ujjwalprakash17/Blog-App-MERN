import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userAuthRoutes from './Routes/userAuthRoutes.js';
import userDetailsRoutes from './Routes/userDetailsRoutes.js';
import userPostRoutes from './Routes/userPostRoutes.js';
import connectDB from './Config/db.js';

const app = express();
configDotenv();

//MiddleWare 
app.use(cors({
    origin : '*',
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
})); //used to enable cors policy
// Increase payload size limit
app.use(express.json({ limit: '2mb' }));//used to parse json request from client side 
app.use(express.urlencoded({ limit: '2mb', extended: true }));//used to parse url encoded request from postman


//Connecting to MongoDB database
connectDB();

//Routes to handle authentication requests
app.use('/api/auth/', userAuthRoutes);

//Routes to CRUD the user Details
app.use('/api/user/', userDetailsRoutes);

//Routes to CRUD the posts of the user
app.use('/api/post/', userPostRoutes);


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})