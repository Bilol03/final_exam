import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'src/enums/roles.enum';
import { UserInterface } from 'src/interfaces/user.interface';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.teacher, UserRole.admin)
  create(@Body() createAssignmentDto: CreateAssignmentDto, @Req() req: Request & { user: UserInterface }) {
    return this.assignmentsService.create(createAssignmentDto, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)

  findOne(@Param('id') id: string, @Req() req: Request & { user: UserInterface }) {
    return this.assignmentsService.findOne(+id, req.user);
  }
}
