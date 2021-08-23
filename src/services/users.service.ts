import bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(query): Promise<User[]> {
    const users: User[] = await this.users.find(query);
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users
      .findOne({ _id: userId })
      .populate({
        path: 'homes.homeId',
        model: 'Homes',
        select: '-__v', //exclude
      })
      .populate({
        path: 'homes.rolId',
        model: 'Roles',
        select: '-__v',
      });

    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findOneAndUpdate({ _id: userId }, { $set: userData });
    if (!updateUserById) throw new HttpException(409, 'No user');

    const updatedUser: User = await this.users.findOne({ _id: userId });

    return updatedUser;
  }

  public async updateUserHomesData(userId: string, userData: UpdateUserDto): Promise<User> {
    const updateUserById: User = await this.users.findOneAndUpdate({ _id: userId }, { $push: { homes: userData } });
    if (!updateUserById) throw new HttpException(409, 'No user');

    const updatedUser: User = await this.users.findOne({ _id: userId });

    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
