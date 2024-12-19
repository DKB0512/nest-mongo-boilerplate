import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: Boolean,
  })
  isDeleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
