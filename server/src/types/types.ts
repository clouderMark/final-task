import {Request} from 'express';
import {CreationOptional, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum EField {
  ID = 'id',
  EMAIL = 'email',
  PASSWORD = 'password',
  NAME = 'name',
  ROLE = 'role',
  AUTH = 'auth',
}

export type TRole = `${ERole.ADMIN}` | `${ERole.USER}`;
export type TEmail = string;
export type TName = string;
export type TId = number;

interface IId {
  [EField.ID]: TId;
}

interface IEmail {
  [EField.EMAIL]: TEmail;
}

interface IPassword {
  [EField.PASSWORD]: string;
}

interface IName {
  [EField.NAME]: string;
}

export interface IDecoded extends IId, IEmail {
  [EField.ROLE]: TRole;
}

export interface IAuthRequest extends Request {
  [EField.AUTH]?: IDecoded;
}

export interface IUserData extends IEmail, IPassword, IName {
  [EField.ROLE]: TRole;
}

export interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.EMAIL]: TEmail;
  [EField.PASSWORD]: string;
  [EField.NAME]: string;
  [EField.ROLE]: TRole;
}
