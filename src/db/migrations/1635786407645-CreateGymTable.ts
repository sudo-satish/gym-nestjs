import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const tableName = 'Gyms';

export class CreateGymTable1635786407645 implements MigrationInterface {
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
            name: 'name',
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
    await queryRunner.createIndex(
      tableName,
      new TableIndex({
        name: 'IDX_NAME',
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
