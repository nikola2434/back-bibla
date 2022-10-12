import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
export const getJWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({ secret: configService.get('ACESS_TOKEN') });
