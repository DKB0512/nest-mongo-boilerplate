import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/schema/user.schema';

export type ForgotDocument = Forgot & Document;

@Schema({ timestamps: true })
export class Forgot {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({
    type: String,
    index: true,
  })
  hash: string;

  @Prop({
    type: User,
  })
  user: User;

  @Prop({
    type: Date,
    required: true,
    default: new Date(),
  })
  createdAt?: Date;

  @Prop({
    type: Boolean,
  })
  isDeleted?: boolean;

  @Prop({
    type: Date,
  })
  deletedAt?: Date;
}

export const ForgotSchema = SchemaFactory.createForClass(Forgot);
