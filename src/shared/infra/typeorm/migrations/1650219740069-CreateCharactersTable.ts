import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCharactersTable1650219740069 implements MigrationInterface {
  name = 'CreateCharactersTable1650219740069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "characters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "characters"`, undefined);
  }
}
