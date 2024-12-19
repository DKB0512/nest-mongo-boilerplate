import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
    // return await createdUser.save();
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<InfinityPaginationResultType<User>> {
    const { page, limit, search } = paginationOptions;

    const skip = (page - 1) * limit;

    const query = { isDeleted: { $ne: true } };

    if (search) {
      query['$or'] = [
        { firstName: { $regex: new RegExp(search, 'i') } },
        { lastName: { $regex: new RegExp(search, 'i') } },
        { email: { $regex: new RegExp(search, 'i') } },
      ];
    }

    const data = await this.userModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .lean()
      .populate('photo', 'path')
      .exec();

    const count = await this.userModel.countDocuments(query);

    return { data, count };
  }

  async findOne(fields: FilterQuery<User>): Promise<User | null> {
    const user = await this.userModel.findOne(fields);
    return user;
  }

  async update(id: string, payload: UpdateUserDto): Promise<User | null> {
    return await this.userModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
  }

  async updateUser(_id: string, user: Partial<User>): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(_id, { $set: user }).exec();
  }

  async softDelete(id: string): Promise<User | null> {
    return await this.userModel
      .findByIdAndUpdate(id, { isDeleted: true })
      .exec();
  }

  async multiDelete(ids: string[]): Promise<any> {
    return await this.userModel
      .updateMany({ _id: { $in: ids } }, { isDeleted: true })
      .exec();
  }
}
