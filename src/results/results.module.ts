import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsModule } from 'src/assignments/assignments.module';
import { ModuleModule } from 'src/module/module.module';
import { UsersModule } from 'src/users/users.module';
import { Result } from './entities/result.entity';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result]),
    AssignmentsModule,
    ModuleModule,
    UsersModule,
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [TypeOrmModule],
})
export class ResultsModule {}
