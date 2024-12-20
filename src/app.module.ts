import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HeaderResolver } from 'nestjs-i18n';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import path from 'path';
import { AuthAppleModule } from './auth-apple/auth-apple.module';
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthTwitterModule } from './auth-twitter/auth-twitter.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AppGateway } from './chat.gateway';
import appConfig from './config/app.config';
import appleConfig from './config/apple.config';
import authConfig from './config/auth.config';
import { AllConfigType } from './config/config.type';
import databaseConfig from './config/database.config';
import facebookConfig from './config/facebook.config';
import fileConfig from './config/file.config';
import googleConfig from './config/google.config';
import mailConfig from './config/mail.config';
import twitterConfig from './config/twitter.config';
import { MongoModule } from './database/mongo.module';
import { FilesModule } from './files/files.module';
import { ForgotModule } from './forgot/forgot.module';
import { HomeModule } from './home/home.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import { ProductsModule } from './product/products.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        twitterConfig,
        appleConfig,
      ],
      envFilePath: ['.env'],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MongoModule,
    UsersModule,
    ProductsModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthTwitterModule,
    AuthAppleModule,
    ForgotModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    CategoryModule,
    AppGateway,
  ],
})
export class AppModule {}
