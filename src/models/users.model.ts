import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const homeSchema: Schema = new Schema({
  rolId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  homeId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    homes: [homeSchema],
  },
  { versionKey: false, timestamps: true },
);

const userModel = model<User & Document>('User', userSchema);

export default userModel;
