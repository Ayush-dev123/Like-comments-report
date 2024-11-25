import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { posts } from 'src/Post/Entity/post.entity';
import { users } from 'src/User/Entity/user.emtity';
import { LikesModule } from 'src/Like/like.module';
import { comments } from './entity/comment.entity';
import { CommentsService } from './comment.service';
import { CommentController } from './comment.controller';



@Module({
    imports: [LikesModule, TypeOrmModule.forFeature([posts, users, comments])],
    providers: [CommentsService],
    controllers: [CommentController],
})
export class CommentsModule { }
