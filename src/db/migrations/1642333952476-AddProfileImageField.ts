import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddProfileImageField1642333952476 implements MigrationInterface {
  name = 'AddProfileImageField1642333952476';
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.addColumn(
      'Users',
      new TableColumn({
        name: 'profileImage',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `ALTER TABLE "Users" DROP COLUMN "profileImage"`,
    );
  }
}
