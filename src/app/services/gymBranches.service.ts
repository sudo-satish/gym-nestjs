import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from 'src/db/entities/branch.entity';
import { BranchDto } from 'src/dto/branch.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GymBranchesService {
  constructor(
    @InjectRepository(Branch)
    public readonly repository: Repository<Branch>,
  ) {}

  async create(branch: BranchDto): Promise<Branch> {
    console.log(this.repository.create(branch));

    return await this.repository.save(this.repository.create(branch));
  }

  async findOneOrFail(findQuery, options = {}) {
    return await this.repository.findOneOrFail(findQuery, options);
  }
}
