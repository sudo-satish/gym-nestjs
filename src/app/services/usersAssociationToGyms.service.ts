import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersAssociationToGym } from 'src/db/entities/usersAssociationToGyms.entity';
import { UsersAssociationToGymDto } from 'src/dto/usersAssociationToGym.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersAssociationToGymsService {
  constructor(
    @InjectRepository(UsersAssociationToGym)
    public readonly repsitory: Repository<UsersAssociationToGym>,
  ) {}

  async create(gym: UsersAssociationToGymDto): Promise<UsersAssociationToGym> {
    return await this.repsitory.save(this.repsitory.create(gym));
  }

  async findOneOrFail(findQuery) {
    return await this.repsitory.findOneOrFail(findQuery);
  }
}
