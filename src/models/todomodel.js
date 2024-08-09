import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo:{
        type:String
    }
})

export const Todo = mongoose.model("Todo",todoSchema)