import { Model, Types } from 'mongoose';

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface Ingredient {
  name: string;
  amount: string;
}

export interface CocktailMutation {
  author: Types.ObjectId;
  name: string;
  image: string;
  receipt: string;
  isPublished: boolean;
  ingredients: Ingredient[];
}
