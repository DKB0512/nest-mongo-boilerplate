import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findManyWithPagination(
    page: number,
    limit: number,
    categoryId?: string,
  ): Promise<Product[]> {
    const query = this.productModel.find();
    if (categoryId) {
      query.where('categoryId', categoryId);
    }
    query.skip((page - 1) * limit).limit(limit);
    return query.exec();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async softDelete(id: string): Promise<void> {
    await this.productModel
      .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .exec();
  }

  async multiDelete(ids: string[]): Promise<void> {
    await this.productModel
      .updateMany({ _id: { $in: ids } }, { isDeleted: true })
      .exec();
  }
}
