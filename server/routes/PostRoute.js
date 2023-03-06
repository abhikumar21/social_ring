import express from "express";
import { createPost, getPost } from "../controllers/postController.js";
const router = express.Router();

router.post('/', createPost)
router.get('/:id', getPost)

export default router;