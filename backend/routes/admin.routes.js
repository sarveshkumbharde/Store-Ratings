import express from 'express';
import {auth} from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import {getUsers, getStores, createUser, createStore, getDashboardStats} from '../controllers/admin.controller.js'

const router = express.Router();

router.get('/users', auth, authorize('ADMIN'), getUsers);
router.get('/stores', auth, authorize('ADMIN'), getStores);
router.post('/add-user', auth, authorize('ADMIN'), createUser);
router.post('/add-store', auth, authorize('ADMIN'), createStore);
router.get('/dashboard',auth, authorize('ADMIN'), getDashboardStats);

export default router; 