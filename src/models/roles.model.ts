import { model, Schema, Document } from 'mongoose';
import { Roles } from '@/interfaces/roles.interface';

const roleSchema: Schema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const roleModel = model<Roles & Document>('Roles', roleSchema);

export default roleModel;
