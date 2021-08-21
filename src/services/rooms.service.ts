import { CreateRoomDto, UpdateRoomDto } from '@/dtos/rooms.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Rooms } from '@/interfaces/rooms.interface';
import userService from '@services/users.service';
import roomModel from '@/models/rooms.model';
import roleModel from '@/models/roles.model';

class RoomService {
  public rooms = roomModel;
  public roles = roleModel;
  public userService = new userService();

  public async findAllRooms(): Promise<Rooms[]> {
    const rooms: Rooms[] = await this.rooms.find();
    console.log(rooms);
    return rooms;
  }

  public async findRoomById(roomId: string): Promise<Rooms> {
    if (isEmpty(roomId)) throw new HttpException(400, "You're not roomId");

    const findRoom: Rooms = await this.rooms.findOne({ _id: roomId });
    if (!findRoom) throw new HttpException(409, "You're not user");

    return findRoom;
  }

  public async findRoomByHomeId(homeId: string): Promise<Rooms[]> {
    if (isEmpty(homeId)) throw new HttpException(400, "You're not roomId");

    const findRoom: Rooms[] = await this.rooms.find({ homeId });

    return findRoom;
  }

  public async createRoom(roomData: CreateRoomDto): Promise<Rooms> {
    if (isEmpty(roomData)) throw new HttpException(400, 'No data');

    const createRoomData: Rooms = await this.rooms.create({ ...roomData });

    return createRoomData;
  }

  public async updateRoom(roomId: string, userData: UpdateRoomDto): Promise<Rooms> {
    if (isEmpty(userData)) throw new HttpException(400, 'Not userData');

    const updateRoomById: Rooms = await this.rooms.findOneAndUpdate({ _id: roomId }, { $set: userData });

    if (!updateRoomById) throw new HttpException(409, 'No home updated');

    return updateRoomById;
  }

  public async deleteRoom(roomId: string): Promise<Rooms> {
    const deleteRoomById: Rooms = await this.rooms.findByIdAndDelete(roomId);
    if (!deleteRoomById) throw new HttpException(409, 'No home deleted');

    return deleteRoomById;
  }
}

export default RoomService;
