import express from 'express';
import { registerUserController } from './register-controller.js';
import { loginUserController } from './login-controller.js';

const router = express.Router();

router.route('/register').post(registerUserController);
router.route('/login').post(loginUserController);

export default router;
