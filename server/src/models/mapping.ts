import database, {CreationOptional, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import {ERole, TEmail, TId, TRole} from '../types/types';
import sequelize from '../sequelize';

const {DataTypes} = database;

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<TId>;
  email: TEmail;
  password: string;
  role: TRole;
}

const User = sequelize.define<UserModel>('User', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: ERole.USER},
}, {});

export {User};
