import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


import { posts } from 'src/Post/Entity/post.entity';
import { Like } from 'src/Like/entity/like.entity';

@Entity()
export class users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true })
    name: string;

    @OneToMany(() => posts, (post) => post.user)
    posts?: posts[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];
}






