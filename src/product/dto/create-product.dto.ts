import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from 'src/category/schema/category.schema';
import { FileEntity } from 'src/files/schema/file.schema';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  image?: FileEntity | null;

  @ApiProperty({ type: () => Category })
  @IsOptional()
  categoryId?: Category;
}
