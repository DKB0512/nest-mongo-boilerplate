import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  age: string;

  @Prop()
  breed: string;

  @Prop()
  createdAt: Date;

  @Prop({
    default: function genDate() {
      return new Date();
    },
  })
  updatedAt: Date;
}

export class Result {
  output: boolean;

  message: any;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
