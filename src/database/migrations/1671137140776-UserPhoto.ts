import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPhoto1671137140776 implements MigrationInterface {
    name = 'UserPhoto1671137140776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashedRt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hashedRt" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashedRt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hashedRt" bytea`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" bytea`);
    }

}
