import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const tableName = 'Attendance';
export class CreateAttendanceTable1636292584061 implements MigrationInterface {
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
            name: 'branchId',
            type: 'int',
          },
          {
            name: 'date',
            type: 'date',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "UserRoles" DROP CONSTRAINT "FK_6d97a630156bb903f7083d62b3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" DROP CONSTRAINT "FK_0fdd0a5cd82220a1cac215bdb63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" DROP CONSTRAINT "FK_a6b832f61ba4bd959c838a1953b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Otp" DROP CONSTRAINT "FK_cd3c112402afde23af5e1f156a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Branches" DROP CONSTRAINT "FK_9afbc1e4588ed55f1f217e2c21f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" DROP CONSTRAINT "UQ_6d97a630156bb903f7083d62b3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" DROP CONSTRAINT "UQ_0fdd0a5cd82220a1cac215bdb63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" DROP CONSTRAINT "UQ_a6b832f61ba4bd959c838a1953b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ALTER COLUMN "userId" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "UserRoles" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."UserRoles_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD "role" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Otp" DROP CONSTRAINT "UQ_cd3c112402afde23af5e1f156a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Otp" ALTER COLUMN "userId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "UQ_953de8baee7f84f0b9eb3ffd58a" UNIQUE ("mobileNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "lastName" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "firstName" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Branches" DROP CONSTRAINT "UQ_9afbc1e4588ed55f1f217e2c21f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Branches" ALTER COLUMN "gymId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Branches" ALTER COLUMN "location" DROP NOT NULL`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_USER_ID" ON "Otp" ("userId") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_MOBILE_NUMBER" ON "Users" ("mobileNumber") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_NAME" ON "Gyms" ("name") `);
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_0fdd0a5cd82220a1cac215bdb63" FOREIGN KEY ("branchId") REFERENCES "Branches"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_6d97a630156bb903f7083d62b3d" FOREIGN KEY ("gymId") REFERENCES "Gyms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_a6b832f61ba4bd959c838a1953b" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Otp" ADD CONSTRAINT "FK_cd3c112402afde23af5e1f156a1" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Branches" ADD CONSTRAINT "FK_9afbc1e4588ed55f1f217e2c21f" FOREIGN KEY ("gymId") REFERENCES "Gyms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
