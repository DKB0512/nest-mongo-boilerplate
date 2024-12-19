import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
})
export class MongoModule {}
