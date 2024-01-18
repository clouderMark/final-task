import {NextFunction, Request, Response} from 'express';
import {IAuthRequest} from 'src/types/types';
import CollectionModel from '../models/Collection/Collection';
import AppError from '../errors/AppError';

class Collection {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const {limit = null, page = null} = req.query;

      const numLimit =
        limit && /[0-9]+/.test(limit.toString()) && parseInt(limit.toString()) ? parseInt(limit.toString()) : 3;
      const numPage =
        page && /[0-9]+/.test(page.toString()) && parseInt(page.toString()) >= 0 ? parseInt(page.toString()) : 1;

      const options = {limit: numLimit, page: numPage};
      const users = await CollectionModel.getAll(options);

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
        throw new Error('Не указан id коллекции');
      }

      const user = await CollectionModel.getOne(+id);

      res.json(user);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async create(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.auth?.id) {
        throw new Error('Пользователь не имеет Id');
      } else if (Object.keys(req.body).length === 0) {
        throw new Error('Нет данных для создания');
      }

      const {id} = req.auth;
      const collection = await CollectionModel.create(req.body, id, req.files?.image);

      res.json(collection);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async update(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан Id коллекции');
      } else if (!req.auth?.id) {
        throw new Error('Пользователь не имеет Id');
      } else if (Object.keys(req.body).length === 0) {
        throw new Error('Нет данных для обновления');
      }

      const {id} = req.auth;
      const collection = await CollectionModel.update(+req.params.id, req.body, id);

      res.json(collection);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message + 12));
      }
    }
  }

  async delete(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан id коллекции');
      } else if (!req.auth?.id) {
        throw new Error('Пользователь не имеет Id');
      }

      const {id} = req.auth;
      const collection = await CollectionModel.delete(+req.params.id, id);

      res.json(collection);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }
}

export default new Collection();
