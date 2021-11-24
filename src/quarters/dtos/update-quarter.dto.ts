import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuarterDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  quarter: string;
}
