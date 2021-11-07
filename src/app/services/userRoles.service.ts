import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/db/entities/userRole.entity';
import { CreateUserRoleDto } from 'src/dto/userRole.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    public readonly repository: Repository<UserRole>,
  ) {}

  async create(branch: CreateUserRoleDto): Promise<UserRole> {
    return await this.repository.save(this.repository.create(branch));
  }

  async findOneOrFail(findQuery, options) {
    return await this.repository.findOneOrFail(findQuery, options);
  }
}
