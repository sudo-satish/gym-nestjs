import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const tableName = 'Users';
export class CreateUsersTable1635271100475 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: tableName,
			columns: [{
				name: 'id',
				type: "int",
				isPrimary: true,
				isGenerated: true,
				generationStrategy: 'increment',
			},
			{
				name: 'firstName',
				type: "varchar",
				isNullable: true
			},
			{
				name: 'lastName',
				type: "varchar",
				isNullable: true
			},
			{
				name: 'mobileNumber',
				type: 'varchar'
			}
		]
		}))

		await queryRunner.createIndex(tableName, new TableIndex({
			name: "IDX_MOBILE_NUMBER",
			columnNames: ["mobileNumber"]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(tableName);
	}

}
