import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import express from 'express';
import RoomsController from '@/controllers/rooms.controller';
import { CreateRoomDto } from '@/dtos/rooms.dto';
import { ownerMiddleware } from '@/middlewares/owner.middleware';
import { Roles } from '@/enum/roles.enum';

class RoomsRoute implements Routes {
  public app: express.Application;

  public path = '/homes/:homeId/rooms';
  public router = Router();
  public roomController = new RoomsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.roomController.getRoomByHomeId);
    this.router.get(`${this.path}/:id`, authMiddleware, this.roomController.getRoomById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateRoomDto, 'body'), this.roomController.createRoom);
    this.router.put(
      `${this.path}/:id`,
      ownerMiddleware(Roles.ADMIN),
      authMiddleware,
      validationMiddleware(CreateRoomDto, 'body', true),
      this.roomController.updateRoom,
    );
    this.router.delete(`${this.path}/:id`, ownerMiddleware(Roles.ADMIN), authMiddleware, this.roomController.deleteRoom);
  }
}

export default RoomsRoute;
