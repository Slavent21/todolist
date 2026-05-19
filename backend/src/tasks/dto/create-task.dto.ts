import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @ApiProperty({ example: 'Create robot' })
  title!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Create very big robot' })
  description?: string;

  @IsString()
  @ApiProperty({ example: 12 })
  groupId!: string;
}