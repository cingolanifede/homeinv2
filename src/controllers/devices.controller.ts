import { NextFunction, Request, Response } from 'express';
import { CreateDeviceDto } from '@/dtos/devices.dto';
import { Devices } from '@/interfaces/devices.interface';
import DeviceService from '@/services/devices.service';
import MqttHandler from '@/broker/handler.broker';

class DevicesController {
  public deviceService = new DeviceService();
  public handler = new MqttHandler();

  public getDevices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllDevicesData: Devices[] = await this.deviceService.findAllDevices();

      res.status(200).json({ data: findAllDevicesData });
    } catch (error) {
      next(error);
    }
  };

  public getDeviceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('aca');
      const roomId: string = req.params.deviceId;
      const findOneDeviceData: Devices = await this.deviceService.findDeviceById(roomId);

      res.status(200).json({ data: findOneDeviceData });
    } catch (error) {
      next(error);
    }
  };

  public getDevicesByHomeId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeId: string = req.params.homeId;
      const findOneDeviceData: Devices[] = await this.deviceService.findDevicesByHomeId(homeId);

      res.status(200).json({ data: findOneDeviceData });
    } catch (error) {
      next(error);
    }
  };

  public createDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomData: CreateDeviceDto = req.body;
      roomData.homeId = req.params.homeId;
      const createUserData: Devices = await this.deviceService.createDevice(roomData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceId: string = req.params.deviceId;
      const deviceData: CreateDeviceDto = req.body;
      const updateDeviceData: Devices = await this.deviceService.updateDevice(deviceId, deviceData);

      if (deviceData.value) {
        console.log(`value changed to ${deviceData.value}`);
        this.handler.publishMessage('homein2', deviceData.value);
      }
      res.status(200).json({ data: updateDeviceData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceId: string = req.params.deviceId;
      const deleteDeviceData: Devices = await this.deviceService.deleteDevice(deviceId);

      res.status(200).json({ data: deleteDeviceData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DevicesController;
