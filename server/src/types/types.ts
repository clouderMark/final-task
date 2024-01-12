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
  VALUE = 'value',
  ROLE = 'role',
  AUTH = 'auth',
  ISBLOCKED = 'isBlocked',
  IMAGE = 'image',
  VISIBLE = 'visible',
  DESCRIPTION = 'description',
  THEME = 'theme',
  TAG = 'tag',
  ITEMTYPE = 'itemType',
}

export enum EItemTypeProp {
  STR = 'str',
  BOOL = 'bool',
  INT = 'int',
  TEXT = 'text',
  DATE = 'date',
  NULL = 'null',
}

export type TRole = `${ERole.ADMIN}` | `${ERole.USER}`;
export type TEmail = string;
export type TName = string;
export type TId = number;
export type TIsBlocked = boolean;

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
  [EField.NAME]: TName;
}

interface IRole {
  [EField.ROLE]: TRole;
}

interface IIsBlocked {
  [EField.ISBLOCKED]: TIsBlocked;
}

export interface IDecoded extends IId, IEmail {
  [EField.ROLE]: TRole;
}

export interface IAuthRequest extends Request {
  [EField.AUTH]?: IDecoded;
}

export interface IUserData extends IEmail, IPassword, IName, IRole, IIsBlocked {}

export interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.EMAIL]: TEmail;
  [EField.PASSWORD]: string;
  [EField.NAME]: TName;
  [EField.ROLE]: TRole;
  [EField.ISBLOCKED]: CreationOptional<boolean>;
}

export interface ICollectionModel
  extends Model<InferAttributes<ICollectionModel>, InferCreationAttributes<ICollectionModel>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.NAME]: TName;
  [EField.DESCRIPTION]: string;
  [EField.THEME]: string;
  [EField.IMAGE]: string;
  [EField.VISIBLE]: boolean;
  userId?: TId;
}

export interface IItemPropType extends Model<InferAttributes<IItemPropType>, InferCreationAttributes<IItemPropType>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.VALUE]: EItemTypeProp;
  collectionId?: TId;
}

export interface IItemModel extends Model<InferAttributes<IItemModel>, InferCreationAttributes<IItemModel>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.NAME]: TName;
  [EField.IMAGE]: string;
  [EField.VISIBLE]: boolean;
}

export interface ITagModel extends Model<InferAttributes<ITagModel>, InferCreationAttributes<ITagModel>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.NAME]: TName;
}

export interface IItemIntModel extends Model<InferAttributes<IItemIntModel>, InferCreationAttributes<IItemIntModel>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.NAME]: TName;
  [EField.VALUE]: number;
  itemId?: TId;
}

export interface IItemStrModel extends Model<InferAttributes<IItemStrModel>, InferCreationAttributes<IItemStrModel>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.NAME]: TName;
  [EField.VALUE]: string;
  itemId?: TId;
}

export interface IItemBoolModel
  extends Model<InferAttributes<IItemBoolModel>, InferCreationAttributes<IItemBoolModel>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.NAME]: TName;
  [EField.VALUE]: boolean;
  itemId?: TId;
}

export interface IItemDateModel
  extends Model<InferAttributes<IItemDateModel>, InferCreationAttributes<IItemDateModel>> {
  [EField.ID]: CreationOptional<TId>;
  [EField.NAME]: TName;
  [EField.VALUE]: Date;
  itemId?: TId;
}

export interface IOptions {
  page: number;
  limit: number;
}
