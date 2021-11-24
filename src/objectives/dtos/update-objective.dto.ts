import { IsOptional } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Team } from 'src/teams/team.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Year } from 'src/years/year.entity';
import { Quarter } from 'src/quarters/quarter.entity';

export class UpdateObjectiveDto {
  @IsOptional()
  @ApiProperty({ description: 'Especificar objetivo' })
  objective: string;

  @IsOptional()
  @ApiProperty({ description: 'Tipo de objetivo' })
  type: string;

  @IsOptional()
  @ApiProperty({ description: 'Data inicial' })
  initial_date: string;

  @IsOptional()
  @ApiProperty({ description: 'Data final' })
  end_date: string;

  @IsOptional()
  @ApiProperty()
  unity: string;

  @IsOptional()
  @ApiProperty()
  area: string;

  @IsOptional()
  @ApiProperty()
  owner: User;

  @IsOptional()
  @ApiProperty()
  team: Team;

  @IsOptional()
  @ApiProperty()
  year: Year;

  @IsOptional()
  @ApiProperty()
  quarter: Quarter;
}
