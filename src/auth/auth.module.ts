import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ForgotModule } from 'src/forgot/forgot.module';
import { MailModule } from 'src/mail/mail.module';
import { SessionModule } from 'src/session/session.module';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { UsersModule } from 'src/users/users.module';
import { MongooseModelManager } from 'src/utils/injectDynamicModel';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    ForgotModule,
    SessionModule,
    PassportModule,
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    MongooseModelManager,
    IsExist,
    IsNotExist,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    AnonymousStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(
    private readonly modelManager: MongooseModelManager,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  onModuleInit() {
    this.modelManager.addModel(User.name, this.userModel);
  }
}
