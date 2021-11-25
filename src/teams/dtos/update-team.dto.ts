import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTeamDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  team: string;
}
