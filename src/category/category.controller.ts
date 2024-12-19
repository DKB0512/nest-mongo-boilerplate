import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/enum/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/category.schema';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'))
@ApiTags('Category')
@Controller({
  path: 'category',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: String,
    description: 'Optional category ID',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string, // categoryId is still optional in the method signature
  ): Promise<InfinityPaginationResultType<Category>> {
    if (limit > 50) {
      limit = 50;
    }

    if (page <= 0) {
      page = 1;
    }

    return await this.categoryService.findManyWithPagination({
      page,
      limit,
      categoryId,
      search,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.softDelete(id);
  }

  // @Delete('multi-delete')
  // async multiDelete(@Body() multiDeleteDto: MultiDeleteDto) {
  //   try {
  //     await this.categoryService.multiDelete(multiDeleteDto.ids);
  //     return { message: 'Products deleted successfully' };
  //   } catch (error) {
  //     // Handle errors, e.g., log them or respond with an error message
  //     console.error('Failed to delete products:', error);
  //     throw new HttpException('Failed to delete products', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
