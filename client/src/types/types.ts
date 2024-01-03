export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum ELang {
  BEL,
  ENG,
}

export enum ETheme {
  DARK = 'dark',
  LIGHT = 'main',
}

export enum EField {
  ID = 'id',
  EMAIL = 'email',
  PASSWORD = 'password',
  NAME = 'name',
  ROLE = 'role',
  AUTH = 'auth',
  TOKEN = 'token',
  ISAUTH = 'isAuth',
  ISADMIN = 'isAdmin',
}

export type TRole = `${ERole.ADMIN}` | `${ERole.USER}`;
export type TEmail = string;
export type TToken = string;
export type TId = number;
type TPass = string;
export type TName = string;

export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

export interface IId {
  [EField.ID]?: TId;
}
interface IEmail {
  [EField.EMAIL]: TEmail;
}

interface IName {
  [EField.NAME]: TName;
}

export interface ILogin extends IEmail, IId {
  [EField.PASSWORD]: TPass;
}
export interface IToken {
  [EField.TOKEN]: TToken;
}
export interface ISignup extends ILogin {
  [EField.NAME]: string;
}

export interface IObject {
  [key: string]: string;
}

interface IRole {
  [EField.ROLE]: TRole;
}

export interface IUser extends IId, IEmail, IRole, IName {}

export interface IPublickUser extends IId, IRole, IName {}

export interface IChangeRole extends IToken {
  [EField.ID]: TId;
}
