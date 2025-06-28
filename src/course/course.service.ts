import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/enums/roles.enum';
import { UserInterface } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Enrollment } from './entities/enroll.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Enrollment)
    private readonly enrollRepository: Repository<Enrollment>,
    private userService: UsersService,
  ) {}

  async isEnrolled(user: UserInterface, courseId: number) {
    const enrolled = this.enrollRepository.findOne({
      where: { studentId: user.id, courseId: courseId },
    });

    if (!enrolled) return false;
    return true;
  }

  async create(createCourseDto: CreateCourseDto, user: UserInterface) {
    const foundUser = await this.userService.findOne(user.id);
    if (!foundUser) throw new NotFoundException('User not found');
    const newCourse = this.courseRepository.create({
      title: createCourseDto.title,
      description: createCourseDto.description,
      price: createCourseDto.price,
      category: createCourseDto.category,
      level: createCourseDto.level,
      teacherId: foundUser.id,
    });
    this.userService.update(user.id, { role: UserRole.teacher });
    return this.courseRepository.save(newCourse);
  }

  async findAll() {
    return await this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
    user: UserInterface,
  ) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (user.role == UserRole.teacher) {
      if (user.id != course.teacherId)
        throw new Error('You are not the teacher of this course');
    }

    if (updateCourseDto.teacherId) {
      const teacher = await this.userService.findOne(updateCourseDto.teacherId);
      if (!teacher) {
        throw new NotFoundException('Teacher not found');
      }
    }

    const updated = Object.assign(course, updateCourseDto);
    return this.courseRepository.save(updated);
  }

  async remove(id: number) {
    const deleted = await this.courseRepository.delete(id);
    if (deleted.affected == 0) throw new NotFoundException('User not found');
    return { message: 'Course deleted successfully!' };
  }

  async getModules(id: number, user: UserInterface) {
    if (user.role == UserRole.student) {
      const enrolled = this.isEnrolled(user, id);
      if (!enrolled) throw new NotFoundException('You are not enrolled');
    }
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['modules'],
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async enroll(id: number, user: UserInterface) {
    const course = await this.findOne(id);
    const foundUser = await this.userService.findOne(user.id);
    if (!course) throw new NotFoundException('Course not found');
    if (!foundUser) throw new NotFoundException('User not found');

    const enrollment = await this.enrollRepository.create({
      courseId: course.id,
      studentId: foundUser.id,
    });

    return await this.enrollRepository.save(enrollment);
  }
}
