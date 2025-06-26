import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  login(loginDto: LoginDto) {
    return `This action returns all auth`;
  }
}
