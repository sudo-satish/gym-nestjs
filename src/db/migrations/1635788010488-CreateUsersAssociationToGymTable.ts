import { USERS_ASSOCIATION_TO_GYMS_TYPE } from 'src/contants';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const tableName = 'UsersAssociationToGyms';
export class CreateUsersAssociationToGymTable1635788010488
  implements MigrationInterface
{
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
          },
          {
            name: 'associationType',
            enum: Reflect.ownKeys(USERS_ASSOCIATION_TO_GYMS_TYPE) as string[],
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
