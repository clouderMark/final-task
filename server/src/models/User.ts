import memoizee from 'memoizee';
import {ERole, EField, IUserData, TEmail, TId, IOptions} from '../types/types';
import {User as UserMapping} from './mapping';
// import AppError from '../errors/AppError.js';

export const userAttributes = [EField.ID, EField.NAME, EField.ROLE, EField.ISBLOCKED];

class User {
  constructor() {
    this.usersLength = memoizee(this.usersLength);
  }

  async usersLength() {
    const length = await UserMapping.count();

    return length;
  }

  async getAll(options: IOptions) {
    const {limit, page} = options;
    const offset = page * limit;
    const users = await UserMapping.findAll({offset, limit, attributes: userAttributes});

    return {users, numberOfRecords: await this.usersLength()};
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

    if (user.isBlocked) {
      throw new Error(`User ${user.name} is blocked. Сontact with administrator for solve this issue`);
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
