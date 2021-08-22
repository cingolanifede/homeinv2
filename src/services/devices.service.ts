import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import userService from '@services/users.service';
import deviceModel from '@/models/devices.model';
import { Devices } from '@/interfaces/devices.interface';
import { CreateDeviceDto, UpdateDeviceDto } from '@/dtos/devices.dto';

class DeviceService {
  public devices = deviceModel;
  public userService = new userService();

  public async findAllDevices(): Promise<Devices[]> {
    const rooms: Devices[] = await this.devices.find();
    console.log(rooms);
    return rooms;
  }

  public async findDeviceById(deviceId: string): Promise<Devices> {
    if (isEmpty(deviceId)) throw new HttpException(400, "You're not deviceId");

    const findDevice: Devices = await this.devices.findOne({ _id: deviceId });
    if (!findDevice) throw new HttpException(409, "You're not user");

    return findDevice;
  }

  public async findDeviceByHomeId(homeId: string): Promise<Devices[]> {
    if (isEmpty(homeId)) throw new HttpException(400, "You're not deviceId");

    const findDevice: Devices[] = await this.devices.find({ homeId });

    return findDevice;
  }

  public async createDevice(deviceData: CreateDeviceDto): Promise<Devices> {
    if (isEmpty(deviceData)) throw new HttpException(400, 'No data');

    const createDeviceData: Devices = await this.devices.create({ ...deviceData });

    return createDeviceData;
  }

  public async updateDevice(deviceId: string, userData: UpdateDeviceDto): Promise<Devices> {
    if (isEmpty(userData)) throw new HttpException(400, 'Not userData');

    const updateDeviceById: Devices = await this.devices.findOneAndUpdate({ _id: deviceId }, { $set: userData });

    if (!updateDeviceById) throw new HttpException(409, 'No home updated');

    return updateDeviceById;
  }

  public async deleteDevice(deviceId: string): Promise<Devices> {
    const deleteDeviceById: Devices = await this.devices.findByIdAndDelete(deviceId);
    if (!deleteDeviceById) throw new HttpException(409, 'No home deleted');

    return deleteDeviceById;
  }
}

export default DeviceService;
