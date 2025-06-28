import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    // const request = context.switchToHttp().getRequest();
    // const user = request.user;

    // if (!user || !user.role) {
    //   throw new ForbiddenException('Foydalanuvchi aniqlanmadi');
    // }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: any }>();
      const user = request.user;
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      const allowed = requiredRoles.join(' yoki ');
      throw new ForbiddenException(
        `Afsuski, bu amalni faqat ${allowed} bajarishi mumkin. Sizning rolingiz: ${user.role}`,
      );
    }

    return true;
  }
}
