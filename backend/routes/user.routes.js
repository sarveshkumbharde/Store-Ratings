import express from 'express';
import {auth} from '../middlewares/auth.js';
import { getUser, signup, login, logout, updatePassword, getStores, submitRating } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getUser);
router.post('/logout', auth, logout);
router.put('/update-password', auth, updatePassword);
router.get('/stores', auth, getStores);
router.post('/ratings', auth, submitRating);

export default router; 