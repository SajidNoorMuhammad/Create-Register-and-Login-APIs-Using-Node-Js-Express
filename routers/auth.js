import express from 'express'
import User from '../models/User.js';
const router = express.Router();

router.post('/register', (req, res) => {
    const { fullname, email, password } = req.body;

})

router.post('/login', (req, res) => {

})