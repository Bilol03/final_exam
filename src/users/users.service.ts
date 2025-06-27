import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: any) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const updated = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updated);
  }

  async remove(id: number) {
    const deleted = await this.userRepository.delete(id);
    if (deleted.affected === 0) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}
