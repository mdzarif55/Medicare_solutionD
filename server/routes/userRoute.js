import express from 'express';
import { getUserProfile, isAuth, login, logout, register, updateUserProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import { upload } from "../configs/multer.js";
const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser , isAuth)
userRouter.get('/logout', authUser , logout)
userRouter.get('/profile', authUser, getUserProfile);
userRouter.post('/profile', authUser, upload.single('image'), updateUserProfile);
export default userRouter