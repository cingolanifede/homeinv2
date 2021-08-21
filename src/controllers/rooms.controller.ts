import { NextFunction, Request, Response } from 'express';
import { CreateRoomDto, UpdateRoomDto } from '@/dtos/rooms.dto';
import { Rooms } from '@/interfaces/rooms.interface';
import RoomService from '@/services/rooms.service';

class RoomsController {
  public roomService = new RoomService();

  public getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRoomsData: Rooms[] = await this.roomService.findAllRooms();

      res.status(200).json({ data: findAllRoomsData });
    } catch (error) {
      next(error);
    }
  };

  public getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('aca');
      const roomId: string = req.params.id;
      const findOneRoomData: Rooms = await this.roomService.findRoomById(roomId);

      res.status(200).json({ data: findOneRoomData });
    } catch (error) {
      next(error);
    }
  };

  public getRoomByHomeId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeId: string = req.params.homeId;
      const findOneRoomData: Rooms[] = await this.roomService.findRoomByHomeId(homeId);

      res.status(200).json({ data: findOneRoomData });
    } catch (error) {
      next(error);
    }
  };

  public createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomData: CreateRoomDto = req.body;
      roomData.homeId = req.params.homeId;
      const createUserData: Rooms = await this.roomService.createRoom(roomData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId: string = req.params.id;
      const homeData: UpdateRoomDto = req.body;
      const updateRoomData: Rooms = await this.roomService.updateRoom(roomId, homeData);

      res.status(200).json({ data: updateRoomData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId: string = req.params.id;
      const deleteRoomData: Rooms = await this.roomService.deleteRoom(roomId);

      res.status(200).json({ data: deleteRoomData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RoomsController;
