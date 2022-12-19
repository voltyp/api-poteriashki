import { MigrationInterface, QueryRunner } from "typeorm";

export class AnimalsPhotoTable1671404428672 implements MigrationInterface {
    name = 'AnimalsPhotoTable1671404428672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "lastLogin" TO "userPhoto"`);
        await queryRunner.query(`CREATE TABLE "animal_photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, "originalName" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "animalId" integer, CONSTRAINT "PK_f01cee2f741b5cf51e199c97ed2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userPhoto"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userPhoto" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."animal_sex_enum" RENAME TO "animal_sex_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."animal_sex_enum" AS ENUM('Мальчик', 'Девочка')`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "sex" TYPE "public"."animal_sex_enum" USING "sex"::"text"::"public"."animal_sex_enum"`);
        await queryRunner.query(`DROP TYPE "public"."animal_sex_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."animal_status_enum" RENAME TO "animal_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."animal_status_enum" AS ENUM('Ищет хозяина', 'Потерян', 'Хозяин найден', 'На карантине', 'На проверке', 'В путь по радуге', 'Удален')`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "status" TYPE "public"."animal_status_enum" USING "status"::"text"::"public"."animal_status_enum"`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "status" SET DEFAULT 'На проверке'`);
        await queryRunner.query(`DROP TYPE "public"."animal_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "animal_photo" ADD CONSTRAINT "FK_f3f667dbf0b4ad7653330e44256" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal_photo" DROP CONSTRAINT "FK_f3f667dbf0b4ad7653330e44256"`);
        await queryRunner.query(`CREATE TYPE "public"."animal_status_enum_old" AS ENUM('0', '1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "status" TYPE "public"."animal_status_enum_old" USING "status"::"text"::"public"."animal_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "status" SET DEFAULT '4'`);
        await queryRunner.query(`DROP TYPE "public"."animal_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."animal_status_enum_old" RENAME TO "animal_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."animal_sex_enum_old" AS ENUM('0', '1')`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "sex" TYPE "public"."animal_sex_enum_old" USING "sex"::"text"::"public"."animal_sex_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."animal_sex_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."animal_sex_enum_old" RENAME TO "animal_sex_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userPhoto"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userPhoto" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`DROP TABLE "animal_photo"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "userPhoto" TO "lastLogin"`);
    }

}
