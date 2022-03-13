import { Router } from 'express';
import { CreateHomeDto } from '@/dtos/homes.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import express from 'express';
import HomesController from '@/controllers/homes.controller';
import { ownerMiddleware } from '@/middlewares/owner.middleware';
import { Roles } from '@/enum/roles.enum';

class HomesRoute implements Routes {
  public app: express.Application;

  public path = '/homes';
  public router = Router();
  public homesController = new HomesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, /*authMiddleware,*/ this.homesController.getHomes);
    this.router.get(`${this.path}/:homeId`, authMiddleware, this.homesController.getHomeById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateHomeDto, 'body'),
      // ownerMiddleware(Roles.ADMIN),
      this.homesController.createHome,
    );
    this.router.put(
      `${this.path}/:homeId`,
      authMiddleware,
      validationMiddleware(CreateHomeDto, 'body', true),
      ownerMiddleware(Roles.ADMIN),
      this.homesController.updateHome,
    );
    this.router.put(`${this.path}/:homeId/assign`, authMiddleware, ownerMiddleware(Roles.ADMIN), this.homesController.assignHome);
    this.router.delete(`${this.path}/:homeId`, authMiddleware, ownerMiddleware(Roles.ADMIN), this.homesController.deleteHome);
  }
}

export default HomesRoute;
