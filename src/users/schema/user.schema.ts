import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleEnum } from 'src/enum/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: String,
    required: false,
  })
  password: string;

  @Prop({
    type: String,
  })
  provider?: string;

  @Prop({
    type: String,
  })
  socialId?: string;

  @Prop({
    type: String,
  })
  firstName?: string | null;

  @Prop({
    type: String,
  })
  lastName?: string | null;

  @Prop({
    type: String,
    ref: 'FileEntity',
  })
  photo?: string;

  @Prop({
    type: Number,
    enum: StatusEnum,
    default: StatusEnum.inactive,
  })
  status?: number;

  @Prop({
    type: Number,
    enum: RoleEnum,
    default: RoleEnum.user,
  })
  role?: number;

  @Prop({
    type: String,
  })
  hash?: string | null;

  @Prop({
    type: Date,
    required: true,
    default: new Date(),
  })
  createdAt?: Date;

  @Prop({
    type: Date,
    required: true,
    default: new Date(),
  })
  updatedAt?: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
