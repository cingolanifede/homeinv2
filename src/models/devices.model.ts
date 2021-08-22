import { model, Schema, Document } from 'mongoose';
import { Devices } from '@/interfaces/devices.interface';

const deviceSchema: Schema = new Schema(
  {
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
    topic: {
      type: String,
      required: false,
    },
    tipo: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
    homeId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const deviceModel = model<Devices & Document>('Devices', deviceSchema);

export default deviceModel;
