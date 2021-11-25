import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateYearDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  year: string;
}
