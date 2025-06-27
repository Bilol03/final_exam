import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private ConfigService: ConfigService,
    private jwtService: JwtService
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const existEmail = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
    });
    console.log(existEmail);

    if (existEmail) throw new ConflictException('This email is already exist');

    const salt = await this.ConfigService.get('salt');
    const hashed = await bcrypt.hash(createAuthDto.password, +salt);
    const newUser = await this.userRepository.create({
      name: createAuthDto.name,
      email: createAuthDto.email,
      password: hashed,
    });

    return (
      await this.userRepository.save(newUser),
      { message: 'User created successfully', newUser }
    );
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });    
    if (!user) throw new UnauthorizedException('Email yoki parol noto‘g‘ri');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isMatch) throw new UnauthorizedException('Email yoki parol noto‘g‘ri');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {token, user}
  }
}
