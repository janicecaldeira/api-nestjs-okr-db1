import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from "class-validator";
import { User } from "src/users/user.entity";
import { Objective } from "src/objectives/objective.entity";
import { Checkin } from "src/checkin/checkin.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateKeyResultDto {
  @IsString()
  @IsNotEmpty({ message: "Informe um resultado-chave" })
  @ApiProperty({ description: "Especificar resultado-chave" })
  key_result: string;

  @IsString()
  @IsNotEmpty({ message: "Informe o tipo do resultado-chave" })
  @ApiProperty({ description: "Tipo de resultado-chave" })
  type: string;

  @IsString()
  @IsNotEmpty({ message: "Informe a frequência" })
  @ApiProperty({ description: "Frequência de mensuração" })
  frequency: string;

  @IsString()
  @IsNotEmpty({ message: "Informe a classificação" })
  @ApiProperty({ description: "Classificação de prioridade" })
  rating: string;

  @IsNumber()
  @IsNotEmpty({ message: "Informe o valor inicial" })
  @ApiProperty({ description: "Valor inicial" })
  initial_value: number;

  @IsNumber()
  @IsNotEmpty({ message: "Informe o valor da meta" })
  @ApiProperty({ description: "Meta prevista" })
  goal_value: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: "Valor atual em porcentagem" })
  status: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Comentários extras" })
  comment: string;

  done: boolean;

  owner: User;

  objective: Objective;

  checkin: Checkin[];

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Cor opcional (feeling)" })
  color: string;

  @IsString()
  @IsNotEmpty({ message: "Informe o nível de desafio" })
  @ApiProperty({ description: "Classificar nível de desafio" })
  moonshot: string;
}
