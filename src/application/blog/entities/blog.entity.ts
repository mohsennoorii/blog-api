import {Entity, Column } from 'typeorm'
import { ApplicationBaseEntity } from '@shared/entities';
@Entity()
export class Blog extends ApplicationBaseEntity {

    @Column()
    authorId: string;

    @Column()
    title: string;

    @Column({type:'text'})
    content: string;

    @Column()
    image: string;

}
