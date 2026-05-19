import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({ example: 'How are u?' })
  text: string = "";

  @IsString()
  @ApiProperty({ example: 11 })
  taskId: string = "";
}