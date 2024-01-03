import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {ERole, IAuthRequest, TEmail, TId, TRole} from '../types/types';
import UserModel from '../models/User';
import AppError from '../errors/AppError';

const makeJwt = (id: TId, email: TEmail, role: TRole) =>
  jwt.sign({id, email, role}, process.env.SECRET_KEY!, {expiresIn: '24h'});

class User {
  async signup(req: Request, res: Response, next: NextFunction) {
    const {email, password, role = ERole.USER, name} = req.body;

    try {
      if (!email || !password || !name) {
        throw new Error('Пустой email, пароль или name');
      }

      if (role !== ERole.USER) {
        throw new Error('Возможна только роль USER');
      }

      const hash = await bcrypt.hash(password, 5);
      const user = await UserModel.create({email, password: hash, role, name});
      const token = makeJwt(user.id!, user.email, user.role);

      return res.json({token});
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body;
      const user = await UserModel.getByEmail(email);
      const compare = bcrypt.compareSync(password, user.password);

      if (!compare) {
        throw new Error('Указан неверный пароль');
      }

      const token = makeJwt(user.id!, user.email, user.role);

      return res.json({token});
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async check(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      if (req.auth?.id && req.auth?.email && req.auth?.role) {
        const {id, email, role} = req.auth;
        const token = makeJwt(id, email, role);

        if (token) {
          const user = await UserModel.getByEmail(email);

          if (!user) {
            throw new Error('Пользователь не найден в базе данных');
          }
        }

        return res.json({token});
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.getAll();

      res.json(users);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;

      if (!id) {
        throw new Error('Не указан id пользователя');
      }

      const user = await UserModel.getOne(+id);

      res.json(user);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const {email, password, role = ERole.USER, name} = req.body;

    try {
      if (!email || !password || !name) {
        throw new Error('Пустой email, пароль или name');
      }

      if (![ERole.USER, ERole.ADMIN].includes(role)) {
        throw new Error('Недопустимое значение роли');
      }

      const hash = await bcrypt.hash(password, 5);
      const user = await UserModel.create({email, password: hash, role, name});

      res.json(user);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;

      if (!id) {
        throw new Error('Не указан id пользователя');
      }

      if (Object.keys(req.body).length === 0) {
        throw new Error('Нет данных для обновления');
      }

      const {email, role, name} = req.body;
      let {password} = req.body;

      if (role && !(ERole.USER, ERole.ADMIN).includes(role)) {
        throw new Error('Недопустимое значение роли');
      }

      if (password) {
        password = await bcrypt.hash(password, 5);
      }

      const user = await UserModel.update(+id, {email, password, role, name});

      res.json(user);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message + 12));
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;

      if (!id) {
        throw new Error('Не указан id пользователя');
      }

      const user = await UserModel.delete(+id);

      res.json(user);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async changeRole(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.body;

      if (!id) {
        throw new Error('User IDs not specified');
      }

      const users = await UserModel.changeRole(id);

      res.json(users);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }
}

export default new User();
