import {ERole, EField, IUserData, TEmail, TId} from '../types/types';
import {User as UserMapping} from './mapping';
// import AppError from '../errors/AppError.js';

export const userAttributes = {
  attributes: [EField.ID, EField.NAME, EField.ROLE],
};

class User {
  async getAll() {
    const users = await UserMapping.findAll(userAttributes);

    return users;
  }

  async getOne(id: TId) {
    const user = await UserMapping.findByPk(id);

    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }

    return user;
  }

  async getByEmail(email: TEmail) {
    const user = await UserMapping.findOne({where: {email}});

    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }

    return user;
  }

  async create(data: IUserData) {
    const {email, password, role, name} = data;
    const check = await UserMapping.findOne({where: {email}});

    if (check) {
      throw new Error('Пользователь уже существует');
    }

    const user = await UserMapping.create({email, password, role, name});

    return user;
  }

  async update(id: TId, data: IUserData) {
    const user = await UserMapping.findByPk(id);

    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }

    const {email = user.email, password = user.password, role = user.role} = data;

    await user.update({email, password, role});

    return user;
  }

  async delete(id: TId) {
    const user = await UserMapping.findByPk(id);

    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }

    await user.destroy();

    return user;
  }

  async changeRole(id: TId) {
    const user = await UserMapping.findByPk(id);

    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }

    user.role = user.role === ERole.USER ? ERole.ADMIN : ERole.USER;
    await user.save();

    return user;
  }
}

export default new User();
