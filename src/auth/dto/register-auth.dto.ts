import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bilol' })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Pasword.123456' })
  password: string;
}
