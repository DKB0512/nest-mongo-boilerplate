import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Category } from 'src/category/schema/category.schema';
import { FileEntity } from 'src/files/schema/file.schema';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  image?: FileEntity | null;

  @ApiProperty()
  categoryId: Category;
}
