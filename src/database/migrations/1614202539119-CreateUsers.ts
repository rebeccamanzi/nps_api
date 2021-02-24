import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614202539119 implements MigrationInterface {

    // Subir a migration (cria a tabela)
    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
           new Table({
               name: "users",
               columns: [
                   {
                       name: "id",
                       type: "uuid",
                       isPrimary: true // Primary Key
                   },
                   {
                       name: "name",
                       type: "varchar" // string
                   },
                   {
                       name: "email",
                       type: "varchar"
                   },
                   {
                       name: "created_at",
                       type: "timestamp", // data
                       default: "now()" // valor padrão
                   }
               ]
           })
       ) 
    }

    // Rollback
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
