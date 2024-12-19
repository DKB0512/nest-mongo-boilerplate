import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryTable1697708054011 implements MigrationInterface {
  name = 'CreateCategoryTable1697708054011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9c4e4a89e3674fc9f382d733f0" ON "category" ("id") `,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" uuid`);
    // await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ff0c0301a95e517153df97f681" ON "product" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ff0c0301a95e517153df97f681"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9c4e4a89e3674fc9f382d733f0"`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
