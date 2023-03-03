import express from 'express';
import {
  createUserController,
  getUserByIdController,
  updateUserController,
} from './user-controller.js';

const router = express.Router();

router.route('/').post(createUserController);
router.route('/:id').get(getUserByIdController);
router.route('/:id/follower/:idFollower').patch(updateUserController);
export default router;
