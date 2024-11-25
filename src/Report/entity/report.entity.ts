
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from 'typeorm';
import { posts } from 'src/Post/Entity/post.entity';
import { users } from 'src/User/Entity/user.emtity';

@Entity()
export class reports {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => posts, (post) => post.reports, { onDelete: 'CASCADE', eager: true }) // Load post eagerly
    post: posts;

    @ManyToOne(() => users, (user) => user.id, { eager: true }) // Relate to the user entity
    user: users;

    @Column()
    postOwner: number;

    @Column()
    report: string;

    @CreateDateColumn()
    createdAt: Date;
}









