import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from 'src/interfaces/jwt-paload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new NotFoundException(
        'JWT_SECRET is not defined in environment variables',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: { cookies: { token: any; }; }) => req?.cookies?.token,
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: TokenPayload) {
    console.log('✅ JWT VALIDATE:', payload);
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
