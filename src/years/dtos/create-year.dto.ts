import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateYearDto {
  @IsString()
  @IsNotEmpty({ message: "Informe um ano" })
  @ApiProperty()
  year: string;
}
