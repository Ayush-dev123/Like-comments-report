import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from 'typeorm';
import { users } from 'src/User/Entity/user.emtity';
import { posts } from 'src/Post/Entity/post.entity';

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => users, (user) => user.likes, { eager: true })
    user: users;

    @ManyToOne(() => posts, (post) => post.likes, { eager: true })
    post: posts;

    @Column()
    postOwner: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: true })
    isLiked: boolean;
}
