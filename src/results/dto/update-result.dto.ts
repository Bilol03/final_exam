import { PartialType } from '@nestjs/mapped-types';
import { CreateResultDto } from './create-result.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateResultDto extends PartialType(CreateResultDto) {
    @ApiProperty({example: "faqat ustozlar"})
    @IsNumber()
    score: number

    @ApiProperty({example: "faqat studentlar"})
    @IsString()
    body?: string
}
