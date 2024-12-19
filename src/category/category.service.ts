import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    const newCategory = new Category();
    newCategory.name = name;

    return await this.categoryModel.create(newCategory);
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<InfinityPaginationResultType<Category>> {
    const { page, limit, search } = paginationOptions;

    const skip = (page - 1) * limit;

    const query = { isDeleted: { $ne: true } };

    if (search) {
      query['$or'] = [{ name: { $regex: new RegExp(search, 'i') } }];
    }

    const data = await this.categoryModel
      .find(query)
      .limit(limit)
      .skip(skip)
      .lean();

    const count = await this.categoryModel.countDocuments(query);

    return { data, count };
  }

  async findOne(fields: Partial<Category>): Promise<NullableType<Category>> {
    return this.categoryModel.findOne({
      fields,
    });
  }

  async update(
    _id: string,
    payload: Partial<Category>,
  ): Promise<Category | null> {
    return await this.categoryModel.findByIdAndUpdate(_id, { $set: payload });
  }

  async multiDelete(ids: string[]): Promise<void> {
    // Loop through the array of IDs and perform soft delete for each product
    for (const id of ids) {
      await this.softDelete(id);
    }
  }

  async softDelete(_id: string): Promise<void> {
    await this.categoryModel.findByIdAndUpdate(_id, {
      $set: { isDeleted: true },
    });
  }
}
