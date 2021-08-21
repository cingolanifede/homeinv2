import { model, Schema, Document } from 'mongoose';
import { Homes } from '@/interfaces/homes.interface';

const homeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const homeModel = model<Homes & Document>('Homes', homeSchema);

export default homeModel;
