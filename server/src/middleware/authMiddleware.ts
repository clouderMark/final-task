import jwt from 'jsonwebtoken';
import {NextFunction, Response} from 'express';
import {IAuthRequest, IDecoded} from '../types/types';
import AppError from '../errors/AppError';

const decode = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as IDecoded;

    return decoded;
  } catch (e) {
    throw new Error('Неверная подпись токена');
  }
};

const auth = (req: IAuthRequest, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Требуется авторизация');
    }

    const decoded = decode(token);

    req.auth = decoded;
    next();
  } catch (e: unknown) {
    if (e instanceof Error) {
      next(AppError.forbidden(e.message));
    }
  }
};

export default auth;
