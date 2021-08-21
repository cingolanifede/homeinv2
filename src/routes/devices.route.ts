import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import express from 'express';
import { ownerMiddleware } from '@/middlewares/owner.middleware';
import { Roles } from '@/enum/roles.enum';

class DevicesRoute implements Routes {
  public app: express.Application;

  public path = '/homes/:homeId/devices';
  public router = Router();
  public deviceController = new DevicesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.deviceController.getDevicesByHomeId);
    this.router.get(`${this.path}/:id`, authMiddleware, this.deviceController.getDeviceById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateDeviceDto, 'body'), this.deviceController.createDevice);
    this.router.put(`${this.path}/:id`, ownerMiddleware(Roles.ADMIN),authMiddleware, validationMiddleware(CreateDeviceDto, 'body', true), this.deviceController.updateDevice);
    this.router.delete(`${this.path}/:id`, ownerMiddleware(Roles.ADMIN),authMiddleware, this.deviceController.deleteDevice);
  }
}

export default DevicesRoute;
