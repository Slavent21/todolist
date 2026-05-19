import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @IsString()
  @ApiProperty({ example: 'Group 1' })
  name!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'green' })
  color?: string;
}