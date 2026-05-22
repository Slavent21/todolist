import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
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

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  @ApiProperty({ example: 1 })
  priority!: number;
}