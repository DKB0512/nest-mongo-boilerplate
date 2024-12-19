import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  MinLength,
  Validate,
  IsNotEmpty,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test1@example.com' })
  // @Transform(lowerCaseTransformer)
  @IsOptional()
  // @Validate(IsNotExist, ['User'], {
  //   message: 'emailAlreadyExists',
  // })
  @IsEmail()
  email?: string | null;

  @IsNotEmpty({
    message: `Please enter your password.&&&password`,
  })
  @ApiProperty({
    description: `Enter Password`,
    example: `Jondoe123@`,
  })
  @MaxLength(20)
  @MinLength(8, {
    message: `Password is too short. It should be minimum 8 characters.&&&password`,
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Your password must be 8 characters long, should contain at least 1 uppercase, 1 lowercase, 1 numeric or special character.&&&password`,
  })
  password: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @MinLength(3, { message: 'firstName is too short' })
  @MaxLength(30, { message: 'firstName is too long' })
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @MinLength(3, { message: 'lastName is too short' })
  @MaxLength(30, { message: 'lastName is too long' })
  lastName: string | null;

  @ApiProperty()
  @IsOptional()
  photo?: string | null;

  @ApiProperty()
  @IsOptional()
  role?: number | null;

  @ApiProperty()
  @IsOptional()
  status?: number;

  hash?: string | null;
}
