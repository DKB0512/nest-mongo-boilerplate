import { Module, OnModuleInit } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseModelManager } from 'src/utils/injectDynamicModel';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {
  Product,
  ProductDocument,
  ProductSchema,
} from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [MongooseModelManager, IsExist, IsNotExist, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(
    private readonly modelManager: MongooseModelManager,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  onModuleInit() {
    this.modelManager.addModel(Product.name, this.productModel);
  }
}
