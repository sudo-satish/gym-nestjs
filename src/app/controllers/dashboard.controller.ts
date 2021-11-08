import { Controller, Get } from '@nestjs/common';
import { USER_ROLES } from 'src/db/entities/userRole.entity';
import { GymBranchesService } from '../services/gymBranches.service';
import { GymsService } from '../services/gyms.service';
import { UserRolesService } from '../services/userRoles.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private roleService: UserRolesService,
    private gymService: GymsService,
    private branchService: GymBranchesService,
  ) {}

  @Get('statistics')
  async getDashboarCounts() {
    const members = await this.roleService.repository.count({
      role: USER_ROLES.GYM_MEMBER,
    });
    const trainers = await this.roleService.repository.count({
      role: USER_ROLES.GYM_TRAINER,
    });

    const gyms = await this.gymService.gymRepository.count();
    const branches = await this.branchService.repository.count();

    return {
      members,
      gyms,
      branches,
      trainers,
    };
  }
}
