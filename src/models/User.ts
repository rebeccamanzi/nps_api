import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  readonly id: string; // é um uui, mas para o typescript é uma string
  @Column()
  name: string;
  @Column()
  email: string;
  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) { // se o id não existir ainda
      this.id = uuid();
    }
  }
}

export { User }