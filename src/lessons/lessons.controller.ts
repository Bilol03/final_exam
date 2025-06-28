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
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserInterface } from 'src/interfaces/user.interface';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher')
  create(@Body() createLessonDto: CreateLessonDto, @Req() req: Request & { user: UserInterface }) {
    return this.lessonsService.create(createLessonDto, req.user);
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req: Request & { user: UserInterface }) {
    return this.lessonsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto, @Req() req: Request & { user: UserInterface }) {
    return this.lessonsService.update(+id, updateLessonDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher')
  remove(@Param('id') id: string, @Req() req: Request & { user: UserInterface }) {
    return this.lessonsService.remove(+id, req.user);
  }
}
