import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/schema/user.schema';

export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id?: string;

  @Prop({
    type: User,
    index: true,
    ref: 'user',
  })
  user?: User;

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

export const SessionSchema = SchemaFactory.createForClass(Session);
