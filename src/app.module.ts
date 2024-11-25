import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './Like/entity/like.entity';
import { posts } from './Post/Entity/post.entity';
import { users } from './User/Entity/user.emtity';
import { LikesModule } from './Like/like.module';
import { PostModule } from './Post/post.module';
import { UsersModule } from './User/user.module';
import { reports } from './Report/entity/report.entity';
import { ReportModule } from './Report/report.module';
import { comments } from './Comment/entity/comment.entity';
import { CommentsModule } from './Comment/comment.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Ayush@123',
    database: 'social_media',
    synchronize: true,
    entities: [Like, posts, users, reports, comments],
  }), LikesModule, PostModule, UsersModule, ReportModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
