import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLessonDto {
    @ApiProperty({ example: 'Lesson 1' })
    @IsString()
    title: string;
    @ApiProperty({ example: 'This is a lesson' })
    @IsString()
    description: string;
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    moduleId: number;

}
