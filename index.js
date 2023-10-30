import express from 'express'
import { connectMongo } from './src/config/dbConfig.js';
import {deleteManyTask, getAllTasks, insertTask, switchTask} from './src/model/TaskModel.js'



const app = express()
const PORT = 8000

app.use(express.json())

let fakeDb = [];
connectMongo()

app.get("/api/v1/task", async(req, res)=>{
    const taskList = await getAllTasks()
    res.json({
        status: "Success",
        message: "Here are the TaskList",
        taskList
        
    })
})

app.post("/api/v1/task", async (req, res)=>{
    const result = await insertTask(req.body)
    // console.log(req.body)
    fakeDb.push(req.body)
    result?._id 
    ? res.json({
        status: "Success",
        message: "New task has been added!",
        result
    })
    : res.json({
        status: "error",
        message: "Error, Unable to add the task, try again later",
        result
    })
})

app.patch("/api/v1/task", async (req, res)=>{
    // console.log(req.body)
    const {_id, type} = req.body;
    const result = await switchTask(_id, {type})
    console.log(req.body, result)
    result?._id 
    ? res.json({
        status: "Success",
        message: "The task has been updated!",
    
    })
    : res.json({
        status: "error",
        message: "Error, Unable to update the task, try again later",
    
    })
})
app.delete("/api/v1/task/", async (req, res)=>{
    // const {_id} = req.params; 
    // console.log(req.body)
    const {ids} = req.body
    console.log(ids)
    const result = await deleteManyTask(ids)
    // res.json({
    //     status: "Success",
    //     message: "To-Do Soon delete"
    // })
    console.log(result)
    result?.deletedCount
    ? res.json({
        status: "Success",
        message: "All the selected task has been deleted successfully",
    
    })
    : res.json({
        status: "error",
        message: "Error, Unable to delete the task, try again later",
    
    })
})


app.listen(PORT, error => error ? console.log(error) : console.log("Your Server is running at http://localhost:" + PORT))