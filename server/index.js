import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'




const app= express();

//middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

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
