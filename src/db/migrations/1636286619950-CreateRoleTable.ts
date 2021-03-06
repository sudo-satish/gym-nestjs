import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRole, USER_ROLES } from '../entities/userRole.entity';

const tableName = 'UserRoles';
export class CreateRoleTable1636286619950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'gymId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'branchId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'role',
            enum: Reflect.ownKeys(USER_ROLES) as string[],
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            isNullable: true,
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['gymId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Gyms',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['branchId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Branches',
        onDelete: 'CASCADE',
      }),
    );

    const user = new User();
    user.mobileNumber = '8130626713';
    user.firstName = 'Super';
    user.lastName = 'Admin';
    const userModel = await queryRunner.manager.save(user);
    const userRole = new UserRole();
    userRole.user = userModel;
    userRole.role = USER_ROLES.SUPER_ADMIN;

    await queryRunner.manager.save(userRole);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
