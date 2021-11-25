import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CheckinRepository } from "./checkin.repository";
import { CheckinController } from "./checkin.controller";
import { CheckinService } from "./checkin.service";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckinRepository]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [CheckinController],
  providers: [CheckinService],
})
export class CheckinModule {}
