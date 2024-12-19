import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MultiDeleteDto {
  @ApiProperty()
  @IsArray()
  // @IsString({ each: true })
  ids: string[];
}
