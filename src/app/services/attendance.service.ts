import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/db/entities/attendance.entity';
import { CreateAttendanceDto } from 'src/dto/attendance.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    public readonly repository: Repository<Attendance>,
  ) {}

  async create(branch: CreateAttendanceDto): Promise<Attendance> {
    return await this.repository.save(this.repository.create(branch));
  }

  async findOneOrFail(findQuery, options = {}) {
    return await this.repository.findOneOrFail(findQuery, options);
  }
}
