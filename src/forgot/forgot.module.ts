import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgotService } from './forgot.service';
import { Forgot, ForgotSchema } from './schema/forgot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Forgot.name, schema: ForgotSchema }]),
  ],
  providers: [ForgotService],
  exports: [ForgotService],
})
export class ForgotModule {}
