import { JwtGuard } from './../guards/jwt.guard';
import { AdminGuard } from './../guards/admin.guards';
import { applyDecorators, UseGuards } from '@nestjs/common';

export type AuthRoleType = 'user' | 'admin' | undefined;

export const Auth = (role: AuthRoleType = 'user') => {
  return applyDecorators(
    role === 'admin' ? UseGuards(JwtGuard, AdminGuard) : UseGuards(JwtGuard),
  );
};
