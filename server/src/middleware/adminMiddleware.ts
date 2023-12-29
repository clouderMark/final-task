import {NextFunction, Response} from 'express';
import {ERole, IAuthRequest} from '../types/types';
import AppError from '../errors/AppError';

const admin = (req: IAuthRequest, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    if (req.auth?.role !== ERole.ADMIN) {
      throw new Error('Только для администратора');
    }

    next();
  } catch (e: unknown) {
    if (e instanceof Error) {
      next(AppError.forbidden(e.message));
    }
  }
};

export default admin;
