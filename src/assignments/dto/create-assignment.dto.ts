import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({ example: 'Assignment 1' })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ example: 'Assignment description' })
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({ example: 2 })
  @IsNumber()
  moduleId: number;
}
