import { MigrationInterface, QueryRunner } from "typeorm";

export class migationsNew1669731876225 implements MigrationInterface {
    name = 'migationsNew1669731876225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sphere_attributes_guide" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(256) NOT NULL, "comments" character varying(256), CONSTRAINT "PK_8a32c6d189a709018f8c2021bb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sphere_attributes_guide_user_users" ("sphereAttributesGuideId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_33ab5243e4c695b3e24a39ea27f" PRIMARY KEY ("sphereAttributesGuideId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6d1947c7b94d680314dbeeed82" ON "sphere_attributes_guide_user_users" ("sphereAttributesGuideId") `);
        await queryRunner.query(`CREATE INDEX "IDX_71670d5823099d81730ee8d2e0" ON "sphere_attributes_guide_user_users" ("usersId") `);
        await queryRunner.query(`ALTER TYPE "public"."animal_categorycode_enum" RENAME TO "animal_categorycode_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."animal_categorycode_enum" AS ENUM('НК', 'НС')`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "categoryCode" TYPE "public"."animal_categorycode_enum" USING "categoryCode"::"text"::"public"."animal_categorycode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."animal_categorycode_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '2'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "sphere_attributes_guide_user_users" ADD CONSTRAINT "FK_6d1947c7b94d680314dbeeed82e" FOREIGN KEY ("sphereAttributesGuideId") REFERENCES "sphere_attributes_guide"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sphere_attributes_guide_user_users" ADD CONSTRAINT "FK_71670d5823099d81730ee8d2e0f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sphere_attributes_guide_user_users" DROP CONSTRAINT "FK_71670d5823099d81730ee8d2e0f"`);
        await queryRunner.query(`ALTER TABLE "sphere_attributes_guide_user_users" DROP CONSTRAINT "FK_6d1947c7b94d680314dbeeed82e"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '2'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."animal_categorycode_enum_old" AS ENUM('0', '1')`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "categoryCode" TYPE "public"."animal_categorycode_enum_old" USING "categoryCode"::"text"::"public"."animal_categorycode_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."animal_categorycode_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."animal_categorycode_enum_old" RENAME TO "animal_categorycode_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71670d5823099d81730ee8d2e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d1947c7b94d680314dbeeed82"`);
        await queryRunner.query(`DROP TABLE "sphere_attributes_guide_user_users"`);
        await queryRunner.query(`DROP TABLE "sphere_attributes_guide"`);
    }

}
