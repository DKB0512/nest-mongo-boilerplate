import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { NullableType } from '../utils/types/nullable.type';
import { Session } from './schema/session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>,
  ) {}

  async findOne(options: Session): Promise<NullableType<Session>> {
    return await this.sessionModel.findOne(options).populate('user', '_id');
  }

  async findMany(options: Session): Promise<Session[]> {
    return await this.sessionModel.find(options);
  }

  async create(data: User): Promise<Session> {
    return await this.sessionModel.create(data);
  }

  async softDelete({
    excludeId,
    ...criteria
  }: {
    id?: Session['_id'];
    user?: Pick<User, '_id'>;
    excludeId?: Session['_id'];
  }): Promise<void> {
    await this.sessionModel.updateOne({
      ...criteria,
      id: criteria.id ? criteria.id : excludeId,
    });
  }
}
