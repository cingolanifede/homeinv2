import { NextFunction, Request, Response } from 'express';
import { CreateHomeDto, UpdateHomeDto } from '@/dtos/homes.dto';
import { Homes } from '@/interfaces/homes.interface';
import HomeService from '@/services/homes.service';
import { User } from '@/interfaces/users.interface';

class HomesController {
  public homeService = new HomeService();

  public getHomes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllHomesData: Homes[] = await this.homeService.findAllHomes();

      res.status(200).json({ data: findAllHomesData });
    } catch (error) {
      next(error);
    }
  };

  public getHomeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeId: string = req.params.id;
      const findOneHomeData: Homes = await this.homeService.findHomeById(homeId);

      res.status(200).json({ data: findOneHomeData });
    } catch (error) {
      next(error);
    }
  };

  public createHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeData: CreateHomeDto = req.body;
      const createUserData: Homes = await this.homeService.createHome(homeData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeId: string = req.params.id;
      const homeData: UpdateHomeDto = req.body;
      const updateHomeData: Homes = await this.homeService.updateHome(homeId, homeData);

      res.status(200).json({ data: updateHomeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public assignHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeId: string = req.params.id;
      const { userId } = req.body;

      const updateHomeData: User = await this.homeService.assignHome(homeId, userId);

      res.status(200).json({ data: updateHomeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeId: string = req.params.id;
      const deleteHomeData: Homes = await this.homeService.deleteHome(homeId);

      res.status(200).json({ data: deleteHomeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default HomesController;
