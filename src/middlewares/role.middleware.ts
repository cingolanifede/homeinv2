import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
// import homeModel from '@/models/homes.model';
import userModel from '@/models/users.model';
import { User } from '@/interfaces/users.interface';

export const roleMiddleware = (myHomeId: string) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      // const findHome = await homeModel.findOne({ _id: homeId });

      const findUser: User = await userModel
        .findOne({ _id: userId })
        .populate({
          path: 'homes.homeId',
          model: 'Homes',
          select: '-__v', //exclude
        })
        .populate({
          path: 'homes.rolId',
          model: 'Roles',
          select: '-__v',
        });
      if (findUser) {
        const found = findUser.homes.filter(element => element.homeId._id === myHomeId);
        if (found && found.length) {
          req.user = findHome;
        }
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } catch (error) {
      next(new HttpException(401, 'Error getting role'));
    }
  };
};
