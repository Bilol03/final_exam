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
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleService } from './module.service';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin, UserRole.teacher)
  create(
    @Body() createModuleDto: CreateModuleDto,
    @Req() req: Request & { user: UserInterface },
  ) {
    return this.moduleService.create(createModuleDto, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req: Request & { user: UserInterface }) {
    return this.moduleService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin, UserRole.teacher)
  update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
    @Req() req: Request & { user: UserInterface },
  ) {
    return this.moduleService.update(+id, updateModuleDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin, UserRole.teacher)
  remove(
    @Param('id') id: string,
    @Req() req: Request & { user: UserInterface },
  ) {
    return this.moduleService.remove(+id, req.user);
  }

  @Get(':moduleId/lessons')
  @UseGuards(JwtAuthGuard)
  async getModules(@Param('moduleId') moduleId: string) {
    return await this.moduleService.getLessons(+moduleId);
  }
}
