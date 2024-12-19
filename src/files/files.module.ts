import { S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import multerS3 from 'multer-s3';
import { AllConfigType } from '../config/config.type';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FileEntity, FileEntitySchema } from './schema/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileEntity.name, schema: FileEntitySchema },
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        const storages = {
          local: () =>
            diskStorage({
              destination: './files',
              filename: (request, file, callback) => {
                callback(
                  null,
                  `${randomStringGenerator()}.${file.originalname
                    .split('.')
                    .pop()
                    ?.toLowerCase()}`,
                );
              },
            }),
          s3: () => {
            const s3 = new S3Client({
              region: configService.get('file.awsS3Region', { infer: true }),
              credentials: {
                accessKeyId: configService.getOrThrow('file.accessKeyId', {
                  infer: true,
                }),
                secretAccessKey: configService.getOrThrow(
                  'file.secretAccessKey',
                  { infer: true },
                ),
              },
            });

            return multerS3({
              s3: s3,
              bucket: configService.getOrThrow('file.awsDefaultS3Bucket', {
                infer: true,
              }),
              acl: 'public-read',
              contentType: multerS3.AUTO_CONTENT_TYPE,
              key: (request, file, callback) => {
                callback(
                  null,
                  `${randomStringGenerator()}.${file.originalname
                    .split('.')
                    .pop()
                    ?.toLowerCase()}`,
                );
              },
            });
          },
        };

        return {
          fileFilter: (request, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
              return callback(
                new HttpException(
                  {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                      file: `cantUploadFileType`,
                    },
                  },
                  HttpStatus.UNPROCESSABLE_ENTITY,
                ),
                false,
              );
            }

            callback(null, true);
          },
          storage:
            storages[
              configService.getOrThrow('file.driver', { infer: true })
            ](),
          limits: {
            fileSize: configService.get('file.maxFileSize', { infer: true }),
          },
        };
      },
    }),
  ],
  controllers: [FilesController],
  providers: [ConfigModule, ConfigService, FilesService],
})
export class FilesModule {}
