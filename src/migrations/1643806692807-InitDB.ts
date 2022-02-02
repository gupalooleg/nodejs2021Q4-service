import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1643806692807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "login" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42374321" PRIMARY KEY ("id"), CONSTRAINT "UK_cace4a159ff9f2512dd42374321" UNIQUE ("login"))`,
    );

    await queryRunner.query(
      `INSERT INTO "user" ("name", "login", "password") VALUES ('admin', 'admin', '$2a$10$voOieYJ/JQsaoO1HgZnp1uvM.k/m1rF5LpbBcKeWrhXUuN0GLme7y')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
