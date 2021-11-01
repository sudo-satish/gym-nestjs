import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gym } from 'src/db/entities/gym.entity';
import { GymDto } from 'src/dto/gym.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GymsService {
  constructor(
    @InjectRepository(Gym)
    public readonly gymRepository: Repository<Gym>,
  ) {}

  async create(gym: GymDto): Promise<Gym> {
    return await this.gymRepository.save(this.gymRepository.create(gym));
  }

  async findOneOrFail(findQuery) {
    return await this.gymRepository.findOneOrFail(findQuery);
  }
}
