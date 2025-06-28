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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserInterface } from 'src/interfaces/user.interface';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request & { user: UserInterface }) {
    const newCourse = await this.courseService.create(createCourseDto, req.user);
    return {message: 'Course created successfully', course: newCourse};
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Req() req: Request & { user: UserInterface }) {
    return this.courseService.update(+id, updateCourseDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  @Get(":courseId/module")
  @UseGuards(JwtAuthGuard, )
  async getModules(@Param('courseId') courseId: string) {
    return await this.courseService.getModules(+courseId);
  }
}
