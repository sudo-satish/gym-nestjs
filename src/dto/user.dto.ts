import { Length } from 'class-validator';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  mobileNumber: string;
}
