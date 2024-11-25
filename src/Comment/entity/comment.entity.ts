import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from 'typeorm';
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
}


