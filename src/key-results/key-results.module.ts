import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyResultRepository } from './key-result.repository';
import { KeyResultsService } from './key-results.service';
import { KeyResultsController } from './key-results.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([KeyResultRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [KeyResultsService],
  controllers: [KeyResultsController],
})
export class KeyResultsModule {}
