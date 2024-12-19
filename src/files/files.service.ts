import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AllConfigType } from 'src/config/config.type';
import { FileEntity } from './schema/file.schema';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @InjectModel(FileEntity.name) private readonly fileModel: Model<FileEntity>,
  ) {}

  async uploadFile(
    file: Express.Multer.File | Express.MulterS3.File,
  ): Promise<FileEntity> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = {
      local: `http://192.168.1.50:4568/${this.configService.get(
        'app.apiPrefix',
        { infer: true },
      )}/v1/${file.path}`,
      s3: (file as Express.MulterS3.File).location,
    };

    return await this.fileModel.create({
      path: path[this.configService.getOrThrow('file.driver', { infer: true })],
    });
  }
}
