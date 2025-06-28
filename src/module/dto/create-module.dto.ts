import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateModuleDto {
    @ApiProperty({ example: 'module1' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'module1 description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    courseId: number;
}
