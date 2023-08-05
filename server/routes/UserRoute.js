import express from 'express';
import { deleteuser, followuser, getAllUsers, getUser, unfollowuser, updateUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteuser)
router.put('/:id/follow', followuser)
router.put('/:id/unfollow', unfollowuser)
router.get('/', getAllUsers)
export default router;