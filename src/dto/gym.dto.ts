import { Type } from 'class-transformer';
import { IsNotEmpty, Length, ValidateNested } from 'class-validator';

export class GymDto {
  @IsNotEmpty({ message: 'Gym name is required!' })
  name: string;
}

export class GymAdminDto {
  firstName: string;
  lastName: string;

  @Length(10, 10, { message: 'Mobile Number should be of 10 digits' })
  mobileNumber: string;
}

export class GymBranchDto {
  @IsNotEmpty({ message: 'Branch name is required!' })
  name: string;

  @IsNotEmpty({ message: 'Location is required!' })
  location: string;

  @IsNotEmpty({ message: 'Gym Id is required!' })
  gymId: number;
}

export class CreateBranchDto {
  @IsNotEmpty({ message: 'Branch manager is required!' })
  @ValidateNested()
  @Type(() => GymAdminDto)
  branchManager: GymAdminDto;

  @IsNotEmpty({ message: 'Branch info is required!' })
  @ValidateNested()
  @Type(() => GymBranchDto)
  branch: GymBranchDto;
}

export class CreateGymDto {
  @ValidateNested()
  gym: GymDto;

  @ValidateNested()
  admin: GymAdminDto;
}
