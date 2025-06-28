import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from 'src/course/course.module';
import { ModuleModule } from 'src/module/module.module';
import { Lessons } from './entities/lesson.entity';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lessons]), ModuleModule, CourseModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService, TypeOrmModule],
})
export class LessonsModule {}
