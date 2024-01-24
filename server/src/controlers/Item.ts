import {NextFunction, Request, Response} from 'express';
import {IAuthRequest} from 'src/types/types';
import ItemModel from '../models/Item/Item';
import AppError from '../errors/AppError';

class Item {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const {limit = null, page = null} = req.query;

      const numLimit =
        limit && /[0-9]+/.test(limit.toString()) && parseInt(limit.toString()) ? parseInt(limit.toString()) : 3;
      const numPage =
        page && /[0-9]+/.test(page.toString()) && parseInt(page.toString()) >= 0 ? parseInt(page.toString()) : 1;

      const options = {limit: numLimit, page: numPage};
      const users = await ItemModel.getAll(options);

      res.json(users);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async create(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new Error('Нет данных для создания');
      } else if (!req.body.collectionId) {
        throw new Error('Item не имеет id родителя');
      }

      const item = await ItemModel.create(req.body, req.files?.image);

      res.json(item);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }

  async getAllById(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const items = await ItemModel.getAllById(id);

      res.json(items);
    } catch (e: unknown) {
      if (e instanceof Error) {
        next(AppError.badRequest(e.message));
      }
    }
  }
}

export default new Item();
