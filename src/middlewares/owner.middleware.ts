import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import roleModel from '@/models/roles.model';

export const ownerMiddleware = (type: string) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const found = req.user.homes.filter(element => element.homeId.toString() === req.params.homeId);

      if (found && found.length) {
        const findRole = await roleModel.findOne({ _id: found[0].rolId });
        if (findRole.type === type) next();
        else next(new HttpException(401, 'User not admin'));
      } else {
        next(new HttpException(401, 'User or Role not found'));
      }
    } catch (error) {
      next(new HttpException(401, 'Error on middleware'));
    }
  };
};
