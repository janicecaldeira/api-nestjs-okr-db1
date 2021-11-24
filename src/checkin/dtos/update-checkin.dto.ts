import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCheckinDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  date: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  current_value: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  comment: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  color: string;
}
