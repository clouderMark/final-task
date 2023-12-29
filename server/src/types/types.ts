import {Request} from 'express';

export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type TRole = `${ERole.ADMIN}` | `${ERole.USER}`;
export type TEmail = string;
export type TId = number;

interface IId {
  id: TId;
}

interface IEmail {
  email: TEmail;
}

interface IPassword {
  password: string;
}

export interface IDecoded extends IId, IEmail {
  role: TRole;
}

export interface IAuthRequest extends Request {
  auth?: IDecoded;
}

export interface IUserData extends IEmail, IPassword {
  role: TRole;
}
