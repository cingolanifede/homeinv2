import { CreateHomeDto, UpdateHomeDto } from '@dtos/homes.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Homes } from '@/interfaces/homes.interface';
import { User } from '@/interfaces/users.interface';
import homeModel from '@/models/homes.model';
import userService from '@services/users.service';
import roleModel from '@/models/roles.model';
import { Roles } from '@/interfaces/roles.interface';
import { UpdateUserDto } from '@/dtos/users.dto';

class HomeService {
  public homes = homeModel;
  public roles = roleModel;
  public userService = new userService();

  public async findAllHomes(): Promise<Homes[]> {
    const homes: Homes[] = await this.homes.find();
    return homes;
  }

  public async findHomeById(homeId: string): Promise<Homes> {
    if (isEmpty(homeId)) throw new HttpException(400, "You're not homeId");

    const findHome: Homes = await this.homes.findOne({ _id: homeId });
    if (!findHome) throw new HttpException(409, "You're not user");

    return findHome;
  }

  public async createHome(homeData: CreateHomeDto): Promise<Homes> {
    if (isEmpty(homeData)) throw new HttpException(400, 'No data');

    const createHomeData: Homes = await this.homes.create({ ...homeData });

    const findRoleId: Roles = await this.roles.findOne({ type: 'admin' });

    const data: UpdateUserDto = {
      homeId: createHomeData._id,
      rolId: findRoleId._id,
    };

    const updateUserData: User = await this.userService.updateUserHomesData(homeData.userId, data);

    if (!updateUserData) throw new HttpException(400, 'Couldnt update user home');

    return createHomeData;
  }

  public async updateHome(homeId: string, userData: UpdateHomeDto): Promise<Homes> {
    if (isEmpty(userData)) throw new HttpException(400, 'Not userData');

    const updateHomeById: Homes = await this.homes.findOneAndUpdate({ _id: homeId }, { $set: userData });

    if (!updateHomeById) throw new HttpException(409, 'No home updated');

    return updateHomeById;
  }

  public async assignHome(homeId: string, userId: any): Promise<User> {
    if (isEmpty(homeId)) throw new HttpException(400, 'No homeId');
    if (isEmpty(userId)) throw new HttpException(400, 'No homeData');

    const findRoleId: Roles = await this.roles.findOne({ type: 'user' });

    const data: UpdateUserDto = {
      homeId,
      rolId: findRoleId._id,
    };

    const updateUserData: User = await this.userService.updateUserHomesData(userId, data);

    if (!updateUserData) throw new HttpException(400, 'Couldnt update user home');

    return updateUserData;
  }

  public async deleteHome(homeId: string): Promise<Homes> {
    const deleteHomeById: Homes = await this.homes.findByIdAndDelete(homeId);
    if (!deleteHomeById) throw new HttpException(409, 'No home deleted');

    return deleteHomeById;
  }
}

export default HomeService;
