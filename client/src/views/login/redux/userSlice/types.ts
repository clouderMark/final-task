import {TEmail, TId, TRole, TToken} from '../../../../types/types';

export interface IInitialState {
  id: TId | null;
  email: TEmail | null;
  isAuth: boolean;
  isAdmin: boolean;
  token: TToken | null;
}

export interface IRegistration {
  email: TEmail;
  id: TId;
  role: TRole;
}

export enum EToken {
  TOKEN = 'token',
}
