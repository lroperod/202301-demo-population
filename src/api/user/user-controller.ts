import { RequestHandler } from 'express';
import { User, UserModel } from './user-schema.js';
import log from '../../logger.js';

export const createUserController: RequestHandler<unknown, User, User> = async (
  req,
  res,
) => {
  const user: User = {
    ...req.body,
  };
  try {
    await UserModel.create(user);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json(error);
    log.error(error);
  }
};

export const getUserByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findOne({ _id: id })
    .populate('followers')
    .exec();
  if (user !== null) {
    return res.json(user);
  }

  res.sendStatus(404);
};

// Añadir al follower su id
export const updateUserController: RequestHandler<{
  id: string;
  idFollower: string;
}> = async (req, res) => {
  const { id, idFollower } = req.params;
  try {
    const dbRes = await UserModel.updateOne(
      { _id: id },
      { $push: { followers: idFollower } },
    ).exec();
    if (dbRes.matchedCount === 0) {
      res.status(404);
    }

    if (dbRes.modifiedCount === 1) {
      res.status(204).json({ message: 'Has obtenido un nuevo follower' });
    }
  } catch (error) {
    res.sendStatus(500).json(error);
  }
};
