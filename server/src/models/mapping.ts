import database from 'sequelize';
import {ERole, IUserModel, EField} from '../types/types';
import sequelize from '../sequelize';

const {DataTypes} = database;

const User = sequelize.define<IUserModel>('User', {
  [EField.ID]: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  [EField.EMAIL]: {type: DataTypes.STRING, unique: true},
  [EField.PASSWORD]: {type: DataTypes.STRING},
  [EField.NAME]: {type: DataTypes.STRING},
  [EField.ROLE]: {type: DataTypes.STRING, defaultValue: ERole.USER},
  [EField.ISBLOCKED]: {type: DataTypes.BOOLEAN, defaultValue: false},
}, {});

export {User};
