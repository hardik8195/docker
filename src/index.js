import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import  Redis  from "ioredis"

const app= express()
export const redis = new Redis({
    host:'redis-18015.c321.us-east-1-2.ec2.redns.redis-cloud.com',
    port:18015,
    password:'nREIqJ3w9Ez3Nbk5PIkOzXLuXIjjTYD6'
})

redis.on("connect",()=>{
    console.log("Redis connected")
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:'16kb'}))

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/fullstacktodoDB")
        console.log("connection sucessfull")
    } catch (error) {
        console.log("mongoDB connection error")
    }
}
const port = 3000
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server is started at ${port}`)
    })
}).catch(err=>{console.log(err)})


import todoRouter from "./routes/todoroute.js"

app.use("/api/v1/todo",todoRouter)


