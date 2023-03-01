import express from 'express';
import { registerUserController } from './register-controller.js';
import { loginUserController } from './login-controller.js';
import { registerValidation } from './register-validation.js';
import { validate } from 'express-validation';

const router = express.Router();

router
  .route('/register')
  .post(validate(registerValidation), registerUserController);
router.route('/login').post(loginUserController);

export default router;
