import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({
    type: Date,
    default: function genDate() {
      return new Date();
    },
  })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
