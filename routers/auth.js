import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import Joi from 'joi'
import sendResponse from '../helper/sendResponse.js';
import jwt from 'jsonwebtoken'
import 'dotenv'

const router = express.Router();

const registerSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    fullname: Joi.string().alphanum().min(3).max(30).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

router.post('/register', async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return sendResponse(res, 400, true, null, error.message);
    const user = await User.findOne({ email: value.email });
    if (user) sendResponse(res, 403, true, null, "User Already Exist With This Email");

    const hashedPassword = await bcrypt.hash(value.password, 12);
    value.password = hashedPassword;
    let newUser = new User({ ...value })
    newUser = await newUser.save();

    sendResponse(res, 201, false, newUser, "User Added Successfully")
})

router.post('/login', async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return sendResponse(res, 400, true, null, error.message);

    const user = await User.findOne({ email: value.email }).lean();
    if (!user) sendResponse(res, 403, true, null, "Please Register First");

    const isPasswordMatch = await bcrypt.compare(value.password, user.password);
    if (!isPasswordMatch) return sendResponse(res, 404, true, null, "Invalid Credentials")

    var token = jwt.sign(user, process.env.AUTH_SECRET);
    sendResponse(res, 201, false, { user, token }, "User Login Successfully")
})

export default router;