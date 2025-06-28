import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from 'src/course/course.module';
import { Modules } from './entities/module.entity';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';

@Module({
  imports: [TypeOrmModule.forFeature([Modules]), CourseModule],
  controllers: [ModuleController],
  providers: [ModuleService],
  exports: [TypeOrmModule, ModuleService],
})
export class ModuleModule {}
