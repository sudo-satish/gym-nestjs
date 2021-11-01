import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  async findOrCreate(userObj: { mobileNumber: string }): Promise<User> {
    try {
      return await this.findOneOrFail(userObj);
    } catch (error) {
      return await this.usersRepository.create(userObj);
    }
  }

  async findOneOrFail(findQuery) {
    return await this.usersRepository.findOneOrFail(findQuery);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, body: User): Promise<UpdateResult> {
    const user = await this.usersRepository.findOne(id);
    return await this.usersRepository.update(id, body);
  }
}
