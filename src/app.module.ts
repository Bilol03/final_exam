import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CourseModule } from './course/course.module';
import { ModuleModule } from './module/module.module';
import { LessonsModule } from './lessons/lessons.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [AuthModule, UsersModule, CourseModule, ModuleModule, LessonsModule, AssignmentsModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
