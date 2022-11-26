import { MigrationInterface, QueryRunner } from "typeorm";

export class AnimalsTable1669250768608 implements MigrationInterface {
    name = 'AnimalsTable1669250768608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "breed" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_d1c857f060076296ce8a87b9043" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animals" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "typeAnimal" character varying NOT NULL, "name" character varying NOT NULL, "sex" character varying, "age" integer NOT NULL, "fur" character varying NOT NULL, "color" character varying NOT NULL, "status" character varying NOT NULL, "curator" character varying NOT NULL, "breedId" integer, CONSTRAINT "PK_6154c334bbb19186788468bce5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "breed" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "breed" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_41749c5d975b6fdf9dcc56861e2" FOREIGN KEY ("breedId") REFERENCES "breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_41749c5d975b6fdf9dcc56861e2"`);
        await queryRunner.query(`ALTER TABLE "breed" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "breed" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "animals"`);
        await queryRunner.query(`DROP TABLE "breed"`);
    }

}
