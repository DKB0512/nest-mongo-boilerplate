import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/product/schema/product.schema';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async run() {
    const count = await this.productModel.countDocuments();

    if (count === 0) {
      await this.productModel.create({
        name: 'TV',
        description: 'panasonic',
        price: 1000,
        createdAt: new Date(),
      });
    }
  }
}
