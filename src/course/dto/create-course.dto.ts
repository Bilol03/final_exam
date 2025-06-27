import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @ApiProperty({ example: 'Course Name' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'Course Description' })
  description: string;
  @IsString()
  @ApiProperty({ example: 'Category' })
  category: string;

  @IsString()
  @ApiProperty({ example: 'advanced' })
  level: string;

  @IsString()
  @ApiProperty({ example: '10000' })
  price: number;

  
}
