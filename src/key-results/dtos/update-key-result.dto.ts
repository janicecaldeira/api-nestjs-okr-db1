import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Objective } from 'src/objectives/objective.entity';

export class UpdateKeyResultDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Especificar resultado-chave' })
  key_result: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Tipo de resultado-chave' })
  type: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Frequência de mensuração' })
  frequency: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Classificação de prioridade' })
  rating: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Valor inicial' })
  initial_value: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Meta prevista' })
  goal_value: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Valor atual em porcentagem' })
  status: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Comentários extras' })
  comment: string;

  @IsOptional()
  @ApiProperty()
  done: boolean;

  @IsOptional()
  owner: User;

  @IsOptional()
  objective: Objective;

  @IsOptional()
  color: string;

  @IsOptional()
  moonshot: string;
}
