import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column, OneToMany } from 'typeorm';
import { posts } from 'src/Post/Entity/post.entity';
import { users } from 'src/User/Entity/user.emtity';



@Entity()
export class comments {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => posts, (post) => post.comments, { onDelete: 'CASCADE', eager: true })
    post: posts;

    @Column()
    userId: number;

    @Column()
    postowner: number;

    @Column()
    comment: string;

    @CreateDateColumn()
    createdAt: Date;


    @Column({ default: true })
    isComment: boolean;

}


@Entity()
export class replies {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => comments, (comment) => comment.id, { onDelete: 'CASCADE', eager: true })
    comment: comments;

    @Column()
    userId: number;

    @Column()
    postowner: number;

    @Column()
    reply: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: true })
    isReply: boolean;
}



