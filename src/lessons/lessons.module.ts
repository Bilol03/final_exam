import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lessons } from './entities/lesson.entity';
import { Modules } from 'src/module/entities/module.entity';
import { ModuleModule } from 'src/module/module.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lessons]), ModuleModule, CourseModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [ LessonsService, TypeOrmModule],
})
export class LessonsModule {}
