import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class MultiDeleteDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
