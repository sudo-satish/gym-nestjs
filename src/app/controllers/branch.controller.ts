import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { USER_ROLES } from 'src/db/entities/userRole.entity';
import { CreateMemberDto, CreateTrainerDto } from 'src/dto/gym.dto';
import { GymBranchesService } from '../services/gymBranches.service';
import { UserRolesService } from '../services/userRoles.service';
import { UsersService } from '../services/users.service';

@Controller('branches')
export class BranchesController {
  constructor(
    private service: GymBranchesService,
    private branchesService: GymBranchesService,
    private usersService: UsersService,
    private userRoleService: UserRolesService,
  ) {}
  @Get('')
  getAllBranches() {
    return this.service.repository.find({ relations: ['gym'] });
  }

  @Post(':branchId/add-trainer')
  async addTrainer(
    @Body() createTrainerDto: CreateTrainerDto,
    @Param('branchId') branchId: string,
  ) {
    const { trainer } = createTrainerDto;
    const branchModel = await this.branchesService.findOneOrFail(branchId, {
      relations: ['gym'],
    });
    const userModel = await this.usersService.create(trainer);

    const userRoleModel = await this.userRoleService.create({
      role: USER_ROLES.GYM_TRAINER,
      gym: branchModel.gym,
      branch: branchModel,
      user: userModel,
    });

    return {
      userModel,
      branchModel,
      userRoleModel,
    };
  }
  @Post(':branchId/add-member')
  async addMember(
    @Body() createTrainerDto: CreateMemberDto,
    @Param('branchId') branchId: string,
  ) {
    const { member } = createTrainerDto;
    const branchModel = await this.branchesService.findOneOrFail(branchId, {
      relations: ['gym'],
    });
    const userModel = await this.usersService.create(member);

    const userRoleModel = await this.userRoleService.create({
      role: USER_ROLES.GYM_MEMBER,
      gym: branchModel.gym,
      branch: branchModel,
      user: userModel,
    });

    return {
      userModel,
      branchModel,
      userRoleModel,
    };
  }

  @Get(':branchId/managers')
  async fetchAllManagers(@Param('branchId') branchId) {
    return this.userRoleService.repository.find({
      where: {
        branch: await this.service.findOneOrFail(branchId),
        role: USER_ROLES.GYM_MANAGER,
      },
      relations: ['user', 'gym', 'branch'],
    });
  }
  @Get(':branchId/members')
  async fetchAllMembers(@Param('branchId') branchId) {
    return this.userRoleService.repository.find({
      where: {
        branch: await this.service.findOneOrFail(branchId),
        role: USER_ROLES.GYM_MEMBER,
      },
      relations: ['user', 'gym', 'branch'],
    });
  }
}
