import { RequestHandler } from 'express';
import { User, UserModel } from '../user/user-schema.js';
import crypto from 'node:crypto';
import { encryptPassword } from './auth-utils.js';

// Const EMAIL_REGEX_VALIDATION = /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/i;

export type AuthRequest = Pick<User, 'email' | 'password'>;

export const registerUserController: RequestHandler<
  unknown,
  unknown,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingDBUser = await UserModel.findOne({ email }).exec();
    if (existingDBUser !== null) {
      return res.status(409).json({ msg: 'User is already registered in app' });
    }

    const user = {
      id: crypto.randomUUID(),
      email,
      password: encryptPassword(password),
    };
    await UserModel.create(user);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};
