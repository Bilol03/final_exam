import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseService } from 'src/course/course.service';
import { UserInterface } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Modules } from './entities/module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Modules)
    private readonly moduleRepository: Repository<Modules>,
    private readonly courseService: CourseService,
  ) {}
  async create(createModuleDto: CreateModuleDto, user: UserInterface) {
    const course = await this.courseService.findOne(createModuleDto.courseId);
    if (!course) throw new NotFoundException('Course not found');
    if (course.teacherId != user.id)
      throw new NotFoundException('You are not the teacher of this course');

    const new_module = this.moduleRepository.create(createModuleDto);
    return this.moduleRepository.save(new_module);
  }

  async findAll() {
    return await this.moduleRepository.find();
  }

  findOne(id: number) {
    const module = this.moduleRepository.findOne({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async update(
    id: number,
    updateModuleDto: UpdateModuleDto,
    user: UserInterface,
  ) {
    const module = await this.moduleRepository.findOne({ where: { id } });
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    const currentCourse = await this.courseService.findOne(module.courseId);
    if (currentCourse.teacherId != user.id)
      throw new NotFoundException('You are not the teacher of this course');

    if (updateModuleDto.courseId) {
      const course = await this.courseService.findOne(updateModuleDto.courseId);
      if (!course) {
        throw new NotFoundException('Course not found');
      }
    }

    const updated = Object.assign(module, updateModuleDto);
    return this.moduleRepository.save(updated);
  }

  async remove(id: number, user: UserInterface) {
    const module = await this.moduleRepository.findOne({ where: { id } });
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    const currentCourse = await this.courseService.findOne(module.courseId);
    if (currentCourse.teacherId != user.id)
      throw new NotFoundException('You are not the teacher of this course');

    const deleted = await this.moduleRepository.delete(id);
    if (deleted.affected === 0)
      throw new NotFoundException('Module Already deleted');
    return { message: 'Module deleted successfully' };
  }
}
