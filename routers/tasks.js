import express from 'express'
const router = express.Router();
import Task from '../models/Task.js'
import sendResponse from '../helper/sendResponse.js';

router.post("/", async (req, res) => {
    const { task } = req.body;
    let newTask = new Task({ task });
    newTask = await newTask.save();
    sendResponse(res, 200, false, newTask, "Task Added Successfully");
})

router.get("/", async (req, res) => {
    const task = await Task.find();
    if (!task) sendResponse(res, 404, true, null, "Task Not Found")
    sendResponse(res, 200, false, task, "Task Fetched Successfully")
})

router.get("/:id", async (req, res) => {
    const tasks = await Task.findById(req.params.id);

    if (!tasks) return sendResponse(res, 404, true, null, "Task Not Found");

    sendResponse(res, 200, false, tasks, "Task Fetched Successfully");
})

router.put("/:id", async (req, res) => {
    const { task, completed } = req.body;
    const tasks = await Task.findById(req.params.id);
    if (!tasks) return sendResponse(res, 404, true, null, "Task Not Found");

    if (task) tasks.task = task;
    if (completed) tasks.completed = completed;

    await tasks.save();
    sendResponse(res, 200, false, tasks, "Task Updated Successfully");
})

router.delete("/:id", async (req, res) => {
    const { task, completed } = req.body;
    const tasks = await Task.findById(req.params.id);
    if (!tasks) return sendResponse(res, 404, true, null, "Task Not Found");

    await Task.deleteOne({ _id: req.params.id })
    sendResponse(res, 200, false, null, "Task Deleted Successfully");
})

export default router;