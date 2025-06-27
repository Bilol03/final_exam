import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsNumber } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsNumber()
    teacherId?: number
}
