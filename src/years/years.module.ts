import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearRepository } from './years.repository';
import { YearsController } from './years.controller';
import { YearsService } from './years.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([YearRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [YearsController],
  providers: [YearsService],
})
export class YearsModule {}
