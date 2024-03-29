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
  ISBLOCKED = 'isBlocked',
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
  id?: TId;
}
interface IEmail {
  email: TEmail;
}

interface IName {
  name: TName;
}

interface IIsBlocked {
  isBlocked: boolean;
}

export interface ILogin extends IEmail, IId {
  password: TPass;
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
  role: TRole;
}

export interface IUser extends IId, IRole, IName, IIsBlocked {}

export interface IChangeUser extends IToken {
  id: TId;
}

export interface IPageLimit {
  page: number;
  limit: number;
}

export interface INumberOfRecords {
  numberOfRecords: number;
}

export enum EItemTypeProp {
  STR = 'str',
  BOOL = 'bool',
  INT = 'int',
  TEXT = 'text',
  DATE = 'date',
}

export interface IImage {
  image: File | null;
  imageUrl: string;
}

export interface ICollectionReq {
  token?: TToken | undefined | null;
  data: FormData;
}

export interface ICollection {
  id: number;
  name: string;
  description: string;
  theme: string;
  image: string;
  visible: boolean;
  item_prop_types: {
    value: string;
  }[];
  userId: TId;
}

export interface ICollectionUpdateReq extends ICollectionReq {
  id: number
}

export interface IParagraphs<T> {
  unique: string;
  id: null | number;
  value: T;
  key: string;
}
