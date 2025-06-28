import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'src/enums/roles.enum';
import { UserInterface } from 'src/interfaces/user.interface';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.student)
  create(
    @Body() createResultDto: CreateResultDto,
    @Req() req: Request & { user: UserInterface },
  ) {
    return this.resultsService.create(createResultDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.student)
  findAll( @Req() req: Request & { user: UserInterface }) {
    return this.resultsService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.student)
  findOne(@Param('id') id: string, @Req() req: Request & { user: UserInterface }) {
    return this.resultsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.student, UserRole.teacher)
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto, @Req() req: Request & { user: UserInterface }) {
    return this.resultsService.update(+id, updateResultDto, req.user);
  }


}
