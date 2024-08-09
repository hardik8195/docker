
import { redis } from "../index.js";
import { Todo } from "../models/todomodel.js";

export const addTodo = async (req, res) => {
    const { todo } = req.body;
    console.log(todo)

    try {
    
        const saveTodo = await Todo.create({ todo });

       
        const createdTodo = await Todo.findById(saveTodo._id);

        await redis.set(`todo:${createdTodo._id}`,JSON.stringify(createdTodo))

       
        return res.status(201).json(createdTodo);
    } catch (error) {
        console.error('Error adding todo:', error);
        return res.status(500).json({ message: 'Failed to add todo', error });
    }
};

export const getTodos = async (req,res) => {
    const cachedTodos = await redis.get('todos');

    if (cachedTodos) {
        console.log('Serving todos from Redis cache');
        return res.status(200).json(JSON.parse(cachedTodos));
    }

    const todos =await Todo.find()
    await redis.set('todos', JSON.stringify(todos));
    return res.status(200).json(todos)
}

export const deleteTodo = async (req,res) => {
    try {
        const todoId = req.params.id
        await Todo.findByIdAndDelete(todoId)

        return res.status(200).json({message:"successfully deleted"})
    } catch (error) {
        console.log("todo not successfully deleted")
    }
}
export const updateTodo = async (req,res) => {
    const {todo} = req.body
    try {
        const todoId = req.params.id
        await Todo.findByIdAndUpdate(todoId,
        {
            todo
        },
        {
            new:true
        }
        )

        return res.status(200).json({message:"sucessfully updated todo"})
    } catch (error) {
        console.log(error)
    }
}
