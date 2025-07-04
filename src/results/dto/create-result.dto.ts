import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateResultDto {
  @ApiProperty({ example: 'Body' })
  @IsString()
  body: string;
  @ApiProperty({ example: 1 })
  @IsNumber()
  assignmentId: number;
}
