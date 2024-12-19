import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Forgot } from './schema/forgot.schema';

@Injectable()
export class ForgotService {
  constructor(
    @InjectModel(Forgot.name) private readonly forgotModel: Model<Forgot>,
  ) {}

  async findOne(
    paginationOptions: Partial<IPaginationOptions> & Partial<Forgot>,
  ): Promise<NullableType<Forgot>> {
    return this.forgotModel.findOne({
      paginationOptions,
    });
  }

  async findMany(
    paginationOptions: Partial<IPaginationOptions> & Partial<Forgot>,
  ): Promise<Forgot[]> {
    return this.forgotModel.find({
      paginationOptions,
    });
  }

  async create(data: Partial<Forgot>): Promise<Forgot> {
    return await this.forgotModel.create(data);
  }

  async softDelete(_id: string): Promise<void> {
    await this.forgotModel.updateOne(
      { _id: _id },
      { $set: { isDeleted: true, deletedAt: new Date() } },
    );
  }
}
