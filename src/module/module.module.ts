import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Course } from 'src/course/entities/course.entity';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Modules]), CourseModule],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
