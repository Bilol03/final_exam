import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private ConfigService: ConfigService,
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
    })

    return await this.userRepository.save(newUser), { message: 'User created successfully', newUser};
  }

  login(loginDto: LoginDto) {
    return `This action returns all auth`;
  }
}
