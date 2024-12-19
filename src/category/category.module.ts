import { Module, OnModuleInit } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseModelManager } from 'src/utils/injectDynamicModel';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {
  Category,
  CategoryDocument,
  CategorySchema,
} from './schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [MongooseModelManager, IsExist, IsNotExist, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule implements OnModuleInit {
  constructor(
    private readonly modelManager: MongooseModelManager,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  onModuleInit() {
    this.modelManager.addModel(Category.name, this.categoryModel);
  }
}
