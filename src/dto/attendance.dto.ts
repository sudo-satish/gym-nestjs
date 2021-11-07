import { IsDateString, IsNotEmpty } from 'class-validator';
import { Branch } from 'src/db/entities/branch.entity';
import { User } from 'src/db/entities/user.entity';

export class CreateAttendanceDto {
  user: User;
  branch: Branch;
  date: Date;
}

export class CreateAttendanceRequestDto {
  @IsNotEmpty({ message: 'User Id is required!' })
  userId: string;

  @IsNotEmpty({ message: 'Branch Id is required!' })
  branchId: string;

  @IsNotEmpty({ message: 'Date is required!' })
  @IsDateString()
  date: string;
}
