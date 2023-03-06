import express from 'express';
import { deleteuser, followuser, getUser, unfollowUser, updateUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteuser)
router.put('/:id/follow', followuser)
router.put('/:id/unfollow', unfollowUser)
export default router;