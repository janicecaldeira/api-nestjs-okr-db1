import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuarterDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um quarter' })
  @ApiProperty()
  quarter: string;
}
