import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import { Product, ProductSchema } from 'src/product/schema/product.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { ProductSeedModule } from './product/product-seed.module';
import { UserSeedModule } from './user/user-seed.module';

@Module({
  imports: [
    ProductSeedModule,
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(
      'mongodb://admin:admin@localhost:27017/boilerplate?authSource=admin',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
})
export class SeedModule {}
