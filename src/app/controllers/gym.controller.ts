import { Body, Controller, Post } from '@nestjs/common';
import { USER_ROLES } from 'src/db/entities/userRole.entity';
import { CreateBranchDto, CreateGymDto } from 'src/dto/gym.dto';
import { GymBranchesService } from '../services/gymBranches.service';
import { GymsService } from '../services/gyms.service';
import { UserRolesService } from '../services/userRoles.service';
import { UsersService } from '../services/users.service';

@Controller('gyms')
export class GymsController {
  constructor(
    private readonly gymsService: GymsService,
    private readonly branchesService: GymBranchesService,
    private readonly usersService: UsersService,
    private readonly userRoleService: UserRolesService,
  ) {}

  @Post('create-with-admin')
  async create(@Body() { gym, admin }: CreateGymDto) {
    const gymModel = await this.gymsService.create(gym);
    const userModel = await this.usersService.create(admin);
    const userRoleModel = await this.userRoleService.create({
      gym: gymModel,
      role: USER_ROLES.GYM_ADMIN,
      user: userModel,
    });
    return {
      gymModel,
      userModel,
      userRoleModel,
    };
  }

  @Post('create-branch')
  async createBranch(@Body() createBranchDto: CreateBranchDto) {
    const { branchManager, branch } = createBranchDto;
    const gym = await this.gymsService.findOneOrFail(branch.gymId);
    const userModel = await this.usersService.create(branchManager);
    const branchModel = await this.branchesService.create({
      ...branch,
      gym,
    });

    const userRoleModel = await this.userRoleService.create({
      role: USER_ROLES.GYM_MANAGER,
      gym,
      branch: branchModel,
      user: userModel,
    });

    return {
      userModel,
      branchModel,
      userRoleModel,
    };
  }
}
