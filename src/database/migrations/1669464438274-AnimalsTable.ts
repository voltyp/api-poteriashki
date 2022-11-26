import { MigrationInterface, QueryRunner } from "typeorm";

export class AnimalsTable1669464438274 implements MigrationInterface {
    name = 'AnimalsTable1669464438274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "breed" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_d1c857f060076296ce8a87b9043" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fur" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_c8173d70bb03a89091da618f6b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_animal" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_bfa98739a8e0dd6da0715ad1967" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animals" ("id" SERIAL NOT NULL, "categoryCode" character varying NOT NULL, "userCode" character varying NOT NULL, "isSpayed" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "sex" character varying, "birthday" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "curator" character varying NOT NULL, "typeAnimalId" integer, "breedId" integer, "furId" integer, "colorId" integer, CONSTRAINT "UQ_d51d6a272f8a913371d9e8a17e8" UNIQUE ("userCode"), CONSTRAINT "PK_6154c334bbb19186788468bce5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "middleName" character varying, "email" character varying NOT NULL, "phone" character varying, "password" bytea, "birthDate" TIMESTAMP, "lastLogin" TIMESTAMP WITH TIME ZONE, "hashedRt" bytea, "role" "public"."users_role_enum" NOT NULL DEFAULT '2', "status" "public"."users_status_enum" NOT NULL DEFAULT '0', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5372672fbfd1677205e0ce3ece" ON "users" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_af99afb7cf88ce20aff6977e68" ON "users" ("lastName") `);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_2277fb33f502e884e90283a164f" FOREIGN KEY ("typeAnimalId") REFERENCES "type_animal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_41749c5d975b6fdf9dcc56861e2" FOREIGN KEY ("breedId") REFERENCES "breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_8f2669c43b0339d71251321d375" FOREIGN KEY ("furId") REFERENCES "fur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_852c0b5019b6910625bd6885a38" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_852c0b5019b6910625bd6885a38"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_8f2669c43b0339d71251321d375"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_41749c5d975b6fdf9dcc56861e2"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_2277fb33f502e884e90283a164f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af99afb7cf88ce20aff6977e68"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5372672fbfd1677205e0ce3ece"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "animals"`);
        await queryRunner.query(`DROP TABLE "type_animal"`);
        await queryRunner.query(`DROP TABLE "fur"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "breed"`);
    }

}
