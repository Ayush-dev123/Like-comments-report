import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { posts } from './Entity/post.entity';


@Module({
    imports: [TypeOrmModule.forFeature([posts])],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostModule { }
