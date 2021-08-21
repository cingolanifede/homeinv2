import { Rooms } from '@/interfaces/rooms.interface';
import { model, Schema, Document } from 'mongoose';

const roomSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    homeId: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const roomModel = model<Rooms & Document>('Rooms', roomSchema);

export default roomModel;
