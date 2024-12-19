import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleEnum } from 'src/enum/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async run() {
    const countAdmin = await this.userModel.countDocuments({
      role: RoleEnum.admin,
    });

    if (!countAdmin) {
      await this.userModel.create({
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@example.com',
        password: 'secret',
        role: RoleEnum.admin,
        status: StatusEnum.active,
      });
    }

    const countUser = await this.userModel.countDocuments({
      role: RoleEnum.user,
    });

    if (!countUser) {
      await this.userModel.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'secret',
        role: RoleEnum.user,
        status: StatusEnum.active,
      });
    }
  }
}
