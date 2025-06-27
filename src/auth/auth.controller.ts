import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/register-auth.dto';
import { LocalAuthGuard } from './guards/jwt-local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)

  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {token} = await this.authService.login(loginDto);
    console.log(token);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    return {message: " Logged in successfully", email: loginDto.email};
  }
}
