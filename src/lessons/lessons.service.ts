import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseService } from 'src/course/course.service';
import { UserRole } from 'src/enums/roles.enum';
import { UserInterface } from 'src/interfaces/user.interface';
import { ModuleService } from 'src/module/module.service';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lessons } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lessons)
    private readonly lessonsRepository: Repository<Lessons>,
    private readonly moduleService: ModuleService,
    private readonly courseService: CourseService,
  ) {}

  async teacherValidator(moduleId: number, user: UserInterface) {
    const module = await this.moduleService.findOne(moduleId, user);
    if (!module) throw new NotFoundException('Module not found');
    const course = await this.courseService.findOne(module?.courseId);
    if (!course) throw new NotFoundException('Course not found');
    if (course?.teacherId !== user.id) return false;
    return true;
  }
  async create(createLessonDto: CreateLessonDto, user: UserInterface) {
    if (user.role == UserRole.teacher) {
      const isTeacher = await this.teacherValidator(
        createLessonDto.moduleId,
        user,
      );
      if (!isTeacher)
        throw new NotFoundException('You are not the teacher of this course');
    }
    const lesson = await this.lessonsRepository.create(createLessonDto);
    return await this.lessonsRepository.save(lesson);
  }


  async findOne(id: number, user: UserInterface) {
    const lesson = await this.lessonsRepository.findOne({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if(user.role == UserRole.student) {
      const module = await this.moduleService.findOne(lesson.moduleId, user);
    }
    return lesson;
  }

  async update(
    id: number,
    updateLessonDto: UpdateLessonDto,
    user: UserInterface,
  ) {
    const lesson = await this.lessonsRepository.findOne({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (user.role == UserRole.teacher) {
      const isTeacher = await this.teacherValidator(lesson.moduleId, user);
      if (!isTeacher)
        throw new NotFoundException('You are not the teacher of this course');
    }
    const updated = await this.lessonsRepository.update(id, updateLessonDto);
    if (updated.affected == 0) throw new Error('Course not updated');
    return {
      message: 'Lesson updated successfully',
      lesson: await this.findOne(id, user),
    };
  }

  async remove(id: number, user: UserInterface) {
    const lesson = await this.lessonsRepository.findOne({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (user.role == UserRole.teacher) {
      const isTeacher = await this.teacherValidator(lesson.moduleId, user);
      if (!isTeacher)
        throw new NotFoundException('You are not the teacher of this course');
    }
    await this.lessonsRepository.delete(id);
    return { message: 'Lesson deleted successfully' };
  }
}
