import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuarterRepository } from "./quarters.repository";
import { QuartersService } from "./quarters.service";
import { QuartersController } from "./quarters.controller";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forFeature([QuarterRepository]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  providers: [QuartersService],
  controllers: [QuartersController],
})
export class QuartersModule {}
