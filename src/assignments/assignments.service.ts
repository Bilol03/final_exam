import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseService } from 'src/course/course.service';
import { UserRole } from 'src/enums/roles.enum';
import { UserInterface } from 'src/interfaces/user.interface';
import { ModuleService } from 'src/module/module.service';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    private readonly courseService: CourseService,
    private readonly moduleService: ModuleService,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto, user: UserInterface) {
    const module = await this.moduleService.findOne(
      createAssignmentDto.moduleId,
      user,
    );
    const course = await this.courseService.findOne(module.courseId);
    if (!course) throw new NotFoundException('Course not found');
    if (user.role == 'teacher') {
      if (user.id != course.teacherId)
        throw new NotFoundException('You are not the teacher of this course');
    }
    const assignment = this.assignmentRepository.create(createAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }

  async findOne(id: number, user: UserInterface) {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
    });
    console.log(assignment);

    if (!assignment) throw new NotFoundException('Assignment not found');
    if (user.role == 'student') {
      const module = await this.moduleService.findOne(
        assignment.moduleId,
        user,
      );
      if(!module) throw new NotFoundException('Module not found');
    }
    return assignment;
  }
}
