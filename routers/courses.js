import express from 'express'

const router = express.Router();

const courses = [
    {
        title: "Web & App Development",
        duration: "1 Year",
        id: 1
    }
]

router.get("/", (req, res) => {
    res.status(200).json({
        error: false,
        data: courses,
        msg: "Courses Fetched Successfully"
    })
})

router.post("/", (req, res) => {
    const { title, duration } = req.body;
    courses.push({ title, duration, id: courses.length + 1 });
    console.log("title", title);
    console.log("duration", duration)
    res.status(201).json({
        error: false,
        data: courses,
        msg: "Courses Added Successfully"
    })
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