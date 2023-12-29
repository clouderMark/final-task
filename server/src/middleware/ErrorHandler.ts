import {Request, Response} from 'express';
import AppError from '../errors/AppError';

const ErrorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({message: err.message});
  }

  return res.status(500).json({message: err.message});
};

export default ErrorHandler;
