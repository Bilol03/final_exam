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
import { UserRole } from 'src/enums/roles.enum';

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
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin, UserRole.teacher)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Req() req: Request & { user: UserInterface }) {
    return this.courseService.update(+id, updateCourseDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  @Get(":courseId/modules")
  @UseGuards(JwtAuthGuard)
  async getModules(@Param('courseId') courseId: string, @Req() req: Request & { user: UserInterface }) {
    return await this.courseService.getModules(+courseId, req.user);
  }

  @Post(':courseId/enroll')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.student)
  async getEnrolledStudents(@Param('courseId') courseId: string, @Req () req: Request & { user: UserInterface }) {
    return await this.courseService.enroll(+courseId, req.user);
  }
}
