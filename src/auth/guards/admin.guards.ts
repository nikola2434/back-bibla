import { UserModel } from './../../user/user.model';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserModel }>();
    const user = request.user;

    if (!user.isAdmin) throw new ForbiddenException('Нет доступа!');

    return user.isAdmin;
  }
}
