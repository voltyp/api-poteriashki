import { MigrationInterface, QueryRunner } from "typeorm";

export class animalsT1670023821338 implements MigrationInterface {
    name = 'animalsT1670023821338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "breed" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, "typeAnimalId" integer, CONSTRAINT "PK_d1c857f060076296ce8a87b9043" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_animal" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, CONSTRAINT "UQ_40d56afa14821e19bfff41e92ae" UNIQUE ("value"), CONSTRAINT "PK_bfa98739a8e0dd6da0715ad1967" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fur" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, CONSTRAINT "PK_c8173d70bb03a89091da618f6b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."animal_categorycode_enum" AS ENUM('НК', 'НС')`);
        await queryRunner.query(`CREATE TYPE "public"."animal_sex_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TYPE "public"."animal_status_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "categoryCode" "public"."animal_categorycode_enum" NOT NULL, "userCode" character varying NOT NULL, "isSpayed" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "sex" "public"."animal_sex_enum" NOT NULL, "birthdate" TIMESTAMP NOT NULL, "status" "public"."animal_status_enum" NOT NULL DEFAULT '4', "curator" character varying NOT NULL, "typeAnimalId" integer, "breedId" integer, "furId" integer, "colorId" integer, CONSTRAINT "PK_af42b1374c042fb3fa2251f9f42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "middleName" character varying, "email" character varying NOT NULL, "phone" character varying, "password" bytea, "birthDate" TIMESTAMP, "lastLogin" TIMESTAMP WITH TIME ZONE, "hashedRt" bytea, "role" "public"."users_role_enum" NOT NULL DEFAULT '2', "status" "public"."users_status_enum" NOT NULL DEFAULT '0', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5372672fbfd1677205e0ce3ece" ON "users" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_af99afb7cf88ce20aff6977e68" ON "users" ("lastName") `);
        await queryRunner.query(`ALTER TABLE "breed" ADD CONSTRAINT "FK_c9960dccd19cc8587bc847907df" FOREIGN KEY ("typeAnimalId") REFERENCES "type_animal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_a446f33ae23c96292c088e9527f" FOREIGN KEY ("typeAnimalId") REFERENCES "type_animal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_5aee64ead1f7612fb352444c9f6" FOREIGN KEY ("breedId") REFERENCES "breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_3f8fbb3676bc8ed91c9e4f21455" FOREIGN KEY ("furId") REFERENCES "fur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_4b4c6e0e48c00ded957280d12e0" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_4b4c6e0e48c00ded957280d12e0"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_3f8fbb3676bc8ed91c9e4f21455"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_5aee64ead1f7612fb352444c9f6"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_a446f33ae23c96292c088e9527f"`);
        await queryRunner.query(`ALTER TABLE "breed" DROP CONSTRAINT "FK_c9960dccd19cc8587bc847907df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af99afb7cf88ce20aff6977e68"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5372672fbfd1677205e0ce3ece"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`DROP TYPE "public"."animal_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."animal_sex_enum"`);
        await queryRunner.query(`DROP TYPE "public"."animal_categorycode_enum"`);
        await queryRunner.query(`DROP TABLE "fur"`);
        await queryRunner.query(`DROP TABLE "type_animal"`);
        await queryRunner.query(`DROP TABLE "breed"`);
    }

}
