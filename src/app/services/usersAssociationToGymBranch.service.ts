import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersAssociationToGymBranch } from 'src/db/entities/usersAssociationToGymBranch.entity';
import { UsersAssociationToBranchDto } from 'src/dto/usersAssociationToBranch.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersAssociationToGymBranchesService {
  constructor(
    @InjectRepository(UsersAssociationToGymBranch)
    public readonly repsitory: Repository<UsersAssociationToGymBranch>,
  ) {}

  async create(
    gym: UsersAssociationToBranchDto,
  ): Promise<UsersAssociationToGymBranch> {
    return await this.repsitory.save(this.repsitory.create(gym));
  }

  async findOneOrFail(findQuery) {
    return await this.repsitory.findOneOrFail(findQuery);
  }
}
