import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { users } from 'src/User/Entity/user.emtity';
import { Like } from 'src/Like/entity/like.entity';
import { reports } from 'src/Report/entity/report.entity';
import { comments } from 'src/Comment/entity/comment.entity';

@Entity()
export class posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => users, (user) => user.posts, { onDelete: 'CASCADE' })
    user: users;

    @OneToMany(() => Like, (like) => like.post)
    likes: Like[];


    @OneToMany(() => comments, (comment) => comment.post)
    comments: Like[];

    @OneToMany(() => reports, (report) => report.post, { eager: false })
    reports: Report[];
}


