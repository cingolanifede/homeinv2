import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import roleModel from '@/models/roles.model';
import { configData } from '@/config';
import jwt from 'jsonwebtoken';
import { User } from '@/interfaces/users.interface';
import userModel from '@/models/users.model';

export const ownerMiddleware = (type: string) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
      if (Authorization) {
        const secretKey: string = configData.api.tokenSecret;
        const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
        const userId = verificationResponse._id;

        const findUser: User = await userModel.findOne({ _id: userId })
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
        // console.log(JSON.stringify(findUser))
        // console.log(req.params.homeId);

        const found = findUser.homes.filter(element => element.homeId._id.toString() === req.params.homeId);
        console.log(found)
        if (found && found.length) {
          const findRole = await roleModel.findOne({ _id: found[0].rolId._id });
          if (findRole.type === type) next();
          else next(new HttpException(401, 'User not admin'));
        } else {
          next(new HttpException(401, 'User or Role not found'));
        }
      } else {
        throw new Error('No token found');
      }
    } catch (error) {
      next(new HttpException(401, error));
    }
  };
};
