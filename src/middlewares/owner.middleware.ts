import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';

export const ownerMiddleware = (type: string) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const found = req.user.homes.filter(element => element.homeId._id.toString() === req.params.id && element.rolId.type.toString() === type);
      const msg = `No homes found for user & role`; 

      if (found && found.length) {
        next();
      } else {
        next(new HttpException(401, msg));
      }
    } catch (error) {
      next(new HttpException(401, 'Error on middleware'));
    }
  };
};
