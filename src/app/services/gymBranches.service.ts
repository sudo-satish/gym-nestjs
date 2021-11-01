import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from 'src/db/entities/branch.entity';
import { BranchDto } from 'src/dto/branch.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GymBranchesService {
  constructor(
    @InjectRepository(Branch)
    public readonly gymRepository: Repository<Branch>,
  ) {}

  async create(branch: BranchDto): Promise<Branch> {
    console.log(this.gymRepository.create(branch));

    return await this.gymRepository.save(this.gymRepository.create(branch));
  }

  async findOneOrFail(findQuery) {
    return await this.gymRepository.findOneOrFail(findQuery);
  }
}
