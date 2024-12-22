import express from 'express'
import Course from '../models/Course.js';
import sendResponse from '../helper/sendResponse.js';
import { authenticateAdmin, authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

router.get("/", authenticateUser, async (req, res) => {
    const course = await Course.find();
    sendResponse(res, 200, false, course, "Courses Fetched Successfully")
})

router.post("/", authenticateAdmin, async (req, res) => {
    let course = new Course(req.body);
    course = await course.save();
    sendResponse(res, 201, false, course, "Course Added Successfully")
})

router.get("/:id", (req, res) => {
    const course = courses.find((data) => data.id == req.params.id);

    if (!course) {
        return res.status(404).json({
            error: true,
            data: null,
            msg: "Course Not Found"
        });
    }

    res.status(200).json({
        error: false,
        data: course,
        msg: "Course Found Successfully"
    });
})

export default router