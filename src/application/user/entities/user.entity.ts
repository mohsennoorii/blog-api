import { ApplicationBaseEntity } from "@shared/entities";
import { Entity, Column } from "typeorm";

@Entity()
export class User extends ApplicationBaseEntity {

    @Column({ unique: true })
    username: string;
  
    @Column({ select: false })
    password: string;
  
    @Column({ unique: true })
    email: string;

}
