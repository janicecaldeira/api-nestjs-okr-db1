import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Objective } from 'src/objectives/objective.entity';
import { KeyResult } from 'src/key-results/key-result.entity';
import { Team } from 'src/teams/team.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Year } from 'src/years/year.entity';
import { Quarter } from 'src/quarters/quarter.entity';

export class CreateObjectiveDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um objetivo' })
  @ApiProperty({ description: 'Especificar objetivo' })
  objective: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe um tipo' })
  @ApiProperty({ description: 'Tipo de objetivo' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data inicial' })
  @ApiProperty({ description: 'Data inicial' })
  initial_date: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data final' })
  @ApiProperty({ description: 'Data final' })
  end_date: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma unidade' })
  @ApiProperty()
  unity: string;

  @IsNotEmpty({ message: 'Informe um time' })
  @ApiProperty()
  team: Team;

  @IsNotEmpty({ message: 'Informe um proprietário' })
  @ApiProperty({ description: 'Proprietário do objetivo' })
  owner: User;

  @IsArray()
  @IsOptional()
  key_results: KeyResult[];

  @IsOptional()
  objective_related: Objective;

  @IsNotEmpty({ message: 'Informe um ano' })
  @ApiProperty()
  year: Year;

  @IsNotEmpty({ message: 'Informe um quarter' })
  @ApiProperty()
  quarter: Quarter;
}
