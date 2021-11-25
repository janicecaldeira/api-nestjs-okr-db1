import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty({ message: "Informe um time" })
  @ApiProperty()
  team: string;
}
