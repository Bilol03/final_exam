import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InsertQueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { CourseService } from 'src/course/course.service';
import { ModuleService } from 'src/module/module.service';
import { UserInterface } from 'src/interfaces/user.interface';
import { UserRole } from 'src/enums/roles.enum';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    private readonly courseService: CourseService,
    private readonly moduleService: ModuleService
  ){}

  async create(createAssignmentDto: CreateAssignmentDto, user: UserInterface) {
    const module = await this.moduleService.findOne(createAssignmentDto.moduleId, user);
    const course = await this.courseService.findOne(module.courseId);
    if(!course) throw new NotFoundException('Course not found');
    if(user.role == UserRole.teacher) {
      if(user.id != course.teacherId) throw new NotFoundException('You are not the teacher of this course');
    }
    const assignment = this.assignmentRepository.create(createAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }


  async findOne(id: number, user: UserInterface) {
    const assignment = await this.assignmentRepository.findOne({where: {id}});
    if(!assignment) throw new NotFoundException('Assignment not found');
    if(user.role == UserRole.student) {
      const module = await this.moduleService.findOne(assignment.moduleId, user)
    }
    return assignment
  }
}
