import { Router } from "express";
import { addTodo, deleteTodo, getTodos } from "../controller/todo.controller.js";

const router = Router()

router.route("/addTodo").post(addTodo)
router.route("/deleteTodo/:id").delete(deleteTodo)
router.route("/").get(getTodos)

export default router