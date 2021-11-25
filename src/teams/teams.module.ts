import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamRepository } from "./teams.repository";
import { TeamsService } from "./teams.service";
import { TeamsController } from "./teams.controller";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamRepository]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
