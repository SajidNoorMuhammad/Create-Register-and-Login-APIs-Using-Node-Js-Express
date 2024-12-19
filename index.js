import express from "express"
import morgan from "morgan";
import userRoutes from './routers/users.js'
import coursesRoutes from './routers/courses.js'
import 'dotenv/config'
import mongoose from "mongoose";
import taskRoutes from './routers/tasks.js'

const tasks = [
    {
        id: 1,
        task: "Drink Water",
        completed: true
    },
    {
        id: 2,
        task: "Complete Work",
        completed: false
    },
    {
        id: 3,
        task: "Playing Games",
        completed: true
    }
]


const app = express();
const PORT = 4000;

app.use(morgan('tiny'))

function middleware(req, res, next) {
    req.requestBy = "Sajid Noor Muhammad";
    next();
}

app.use(express.json())
app.use(middleware)
app.use('/user', userRoutes)
app.use('/courses', coursesRoutes)
app.use('/task', taskRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongo DB Connected"))
    .catch((error) => console.log(error))
// app.get('/', (req, res) => {
//     console.log("req.requestBy", req.requestBy)
//     res.status(200).send(tasks);
// })

app.post('/', (req, res) => {
    res.send('Post Request Called')
})

app.put('/', (req, res) => {
    res.send('Put Request Called')
})

app.delete('/', (req, res) => {
    res.send('Delete Request Called')
})

app.listen(PORT, () => {
    console.log("Server is running on port" + PORT)
})

//params
app.get('/singleTask/:id', (req, res) => {
    const task = tasks.find((data) => data.id == req.params.id)

    if (!task) return res.status(404).send("Task Not Found")
    res.status(200).send(task)
})

//queries
app.get('/', (req, res) => {
    const { completed } = req.query;
    let filter = tasks;
    if (completed)
        filter = tasks.filter((data) => completed == "true" ? data.completed == true : data.completed == false)
    res.status(200).send(filter);
})