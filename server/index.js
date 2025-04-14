import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'



const app= express();

//to serve images for public
app.use(express.static('public'))
app.use('/image', express.static("image"))

//middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

dotenv.config()

mongoose.connect(process.env.CONN_STRING,
{useNewUrlParser: true , useUnifiedTopology: true}
)
.then(()=> app.listen(process.env.PORT, () => console.log(`Listening at port ${process.env.PORT}`)))
.catch((error)=> console.log(error));


//usage of routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
