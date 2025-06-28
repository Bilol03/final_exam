import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { UserRole } from 'src/enums/roles.enum';
import { UserInterface } from 'src/interfaces/user.interface';
import { ModuleService } from 'src/module/module.service';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly assignmentService: AssignmentsService,
    private readonly moduleService: ModuleService,
  ) {}
  async create(createResultDto: CreateResultDto, user: UserInterface) {
    const assignment = await this.assignmentService.findOne(
      createResultDto.assignmentId,
      user,
    );
    const newResult = this.resultRepository.create({
      ...createResultDto,
      userId: user.id,
    });
    return await this.resultRepository.save(newResult);
  }

  async findAll(user: UserInterface) {
    const assignments = await this.resultRepository.find({
      where: { userId: user.id },
      relations: ['assignment'],
    });
    return { youAssignments: assignments };
  }

  async findOne(id: number, user: UserInterface) {
    const assignment = await this.resultRepository.findOne({
      where: { userId: user.id },
      relations: ['assignment'],
    });
    if (!assignment)
      throw new NotFoundException('You did not do any assignments');
    return assignment;
  }

  update(id: number, updateResultDto: UpdateResultDto, user: UserInterface) {
    if (user.role == UserRole.teacher) {
      if (!updateResultDto.score || updateResultDto.body)
        throw new UnauthorizedException('You can only update score');
      return this.resultRepository.update(id, { score: updateResultDto.score });
    }
    if (user.role == UserRole.student) {
      if (!updateResultDto.body || updateResultDto.score)
        throw new UnauthorizedException('You can only update body');
      return this.resultRepository.update(id, { body: updateResultDto.body });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
