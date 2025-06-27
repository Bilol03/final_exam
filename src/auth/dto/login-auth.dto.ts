import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({example: "email@gmail.com"})
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: "Password.123456"})
  password: string;
}
