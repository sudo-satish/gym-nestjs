import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserGymBranchRole } from 'src/db/entities/usersAssociationToGymBranch.entity';
import { UserGymRole } from 'src/db/entities/usersAssociationToGyms.entity';
import { CreateBranchDto, CreateGymDto } from 'src/dto/gym.dto';
import { GymBranchesService } from '../services/gymBranches.service';
import { GymsService } from '../services/gyms.service';
import { UsersService } from '../services/users.service';
import { UsersAssociationToGymBranchesService } from '../services/usersAssociationToGymBranch.service';
import { UsersAssociationToGymsService } from '../services/usersAssociationToGyms.service';

@Controller('gyms')
export class GymsController {
  constructor(
    private readonly gymsService: GymsService,
    private readonly branchesService: GymBranchesService,
    private readonly usersService: UsersService,
    private readonly usersAssoctionToGymService: UsersAssociationToGymsService,
    private readonly usersAssoctionToBranchService: UsersAssociationToGymBranchesService,
  ) {}

  @Post('create-with-admin')
  async create(@Body() { gym, admin }: CreateGymDto) {
    const gymModel = await this.gymsService.create(gym);
    const userModel = await this.usersService.create(admin);
    const userAssociationToGym = await this.usersAssoctionToGymService.create({
      gym: gymModel,
      user: userModel,
      associationType: UserGymRole.ADMIN,
    });
    return {
      gymModel,
      userModel,
      userAssociationToGym,
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

    const userBranchAssociationModel =
      await this.usersAssoctionToBranchService.create({
        associationType: UserGymBranchRole.MANAGER,
        branch: branchModel,
        user: userModel,
      });

    return {
      userModel,
      branchModel,
      userBranchAssociationModel,
    };
  }

  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.gymsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<Gym> {
  //   return this.gymsService.gymRepository.findById(id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put(':id')
  // async update(@Param('id') id: string, @Body() body): Promise<User> {
  //   await this.gymsService.update(id, body);
  //   return await this.gymsService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.gymsService.remove(id);
  // }
}
