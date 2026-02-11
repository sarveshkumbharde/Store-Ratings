import express from 'express';
import { auth } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import {
  getMyStore,
  getStoreRatings,
  getStoreStats
} from '../controllers/owner.controller.js';

const router = express.Router();

router.use(auth, authorize('STORE_OWNER'));

router.get('/store', getMyStore);
router.get('/ratings', getStoreRatings);
router.get('/stats', getStoreStats);

export default router;
