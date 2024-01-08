import {ERole, EField, IUserData, TEmail, TId} from '../types/types';
import {User as UserMapping} from './mapping';
// import AppError from '../errors/AppError.js';

interface IOptions {
  page: number;
  limit: number;
}

export const userAttributes = {
  attributes: [EField.ID, EField.NAME, EField.ROLE, EField.ISBLOCKED],
};

class User {
  async getAll(options: IOptions) {
    const {limit, page} = options;
    const offset = page * limit;
    const length = await UserMapping.count();
    const users = await UserMapping.findAll({offset, limit, attributes: userAttributes.attributes});

    return {users, numberOfRecords: length};
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

  async changeStatus(id: TId) {
    const user = await UserMapping.findByPk(id);

    if (!user) {
      throw new Error('Пользователь не найдена в БД');
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    return user;
  }
}

export default new User();
