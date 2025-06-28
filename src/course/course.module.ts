import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UsersModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [TypeOrmModule, CourseService],
})
export class CourseModule {}
