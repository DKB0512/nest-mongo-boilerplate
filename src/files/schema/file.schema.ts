import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import appConfig from '../../config/app.config';
import { AppConfig } from '../../config/config.type';

export type FileEntityDocument = FileEntity & Document;

@Schema({ timestamps: true })
export class FileEntity {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id?: string;

  @Prop({ type: String })
  path: string;

  get transformedPath(): string {
    if (this.path.indexOf('/') === 0) {
      return (appConfig() as AppConfig).backendDomain + this.path;
    }
    return this.path;
  }
}

export const FileEntitySchema = SchemaFactory.createForClass(FileEntity);
