import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/Like/entity/like.entity';
import { posts } from 'src/Post/Entity/post.entity';
import { users } from 'src/User/Entity/user.emtity';
import { reports } from './entity/report.entity';
import { ReportService } from './report.service';
import { LikesModule } from 'src/Like/like.module';
import { ReportController } from './report.controller';



@Module({
    imports: [LikesModule, TypeOrmModule.forFeature([Like, posts, users, reports])],
    providers: [ReportService],
    controllers: [ReportController],
})
export class ReportModule { }
