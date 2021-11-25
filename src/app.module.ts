import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "src/configs/typeorm.config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LoggerInterceptor } from "src/interceptors/logger.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "src/configs/winston.config";
import { ObjectivesModule } from "./objectives/objectives.module";
import { KeyResultsModule } from "./key-results/key-results.module";
import { CheckinModule } from "./checkin/checkin.module";
import { TeamsModule } from "./teams/teams.module";
import { YearsModule } from "./years/years.module";
import { QuartersModule } from "./quarters/quarters.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
    UsersModule,
    AuthModule,
    ObjectivesModule,
    KeyResultsModule,
    CheckinModule,
    TeamsModule,
    YearsModule,
    QuartersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
