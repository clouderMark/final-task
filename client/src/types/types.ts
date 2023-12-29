export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum ELang {
  BEL,
  ENG,
}

export type TRole = `${ERole.ADMIN}` | `${ERole.USER}`;
export type TEmail = string;
export type TToken = string;
export type TId = number;
type TPass = string;

export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

interface IId {
  id?: TId;
}
interface IEmail {
  email: TEmail;
}
export interface ILogin extends IEmail, IId {
  password: TPass;
}
export interface IToken {
  token: TToken;
}
export interface ISignup extends ILogin {
  name: string;
}

export interface IObject {
  [key: string]: string;
}
