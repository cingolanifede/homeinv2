import { model, Schema, Document } from 'mongoose';
import { Devices } from '@/interfaces/devices.interface';

const deviceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: false,
  },
  mac: {
    type: String,
    required: false,
  },
  homeId: {
    type: String,
    required: false,
  },
  roomId: {
    type: String,
    required: false,
  },
});

const deviceModel = model<Devices & Document>('Devices', deviceSchema);

export default deviceModel;
