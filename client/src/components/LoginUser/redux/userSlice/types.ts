import {EField, TEmail, TId, TName, TRole, TToken} from '../../../../types/types';

export interface IInitialState {
  [EField.ID]: TId | null;
  [EField.EMAIL]: TEmail | null;
  [EField.ISAUTH]: boolean;
  [EField.ISADMIN]: boolean;
  [EField.TOKEN]: TToken | null;
  [EField.NAME]: TName | null;
}

export interface IRegistration {
  [EField.EMAIL]: TEmail;
  [EField.ID]: TId;
  [EField.ROLE]: TRole;
  [EField.NAME]: TName;
}

export enum EToken {
  TOKEN = 'token',
}
