import moongose, { Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  followers: [string];
}

const userSchema = new Schema<User>({
  name: String,
  email: String,
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Este "user" es el mismo que hemos puesto abajo
});

export const UserModel = moongose.model<User>('User', userSchema, 'users');
