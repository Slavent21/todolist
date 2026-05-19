import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubtaskDto {
  @IsString()
  @ApiProperty({ example: 'Create subrobot' })
  title: string = "";

  @IsString()
  @ApiProperty({ example: 12 })
  taskId: string = "";
}