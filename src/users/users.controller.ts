import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
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
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { CreateUserDto } from './dto/create-user.dto';
import { MultiDeleteDto } from './dto/multidelete.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'search',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search: string,
  ): Promise<InfinityPaginationResultType<User>> {
    if (limit > 50) {
      limit = 50;
    }

    if (page <= 0) {
      page = 1;
    }

    return this.userService.findManyWithPagination({ page, limit, search });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.softDelete(id);
  }

  @Post('multi-delete')
  async multiDelete(@Body() multiDeleteDto: MultiDeleteDto) {
    try {
      await this.userService.multiDelete(multiDeleteDto.ids);
      return { message: 'Users deleted successfully' };
    } catch (error) {
      console.error('Failed to delete users:', error);
      throw new HttpException(
        'Failed to delete users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
