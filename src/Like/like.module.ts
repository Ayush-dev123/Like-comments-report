import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { posts } from 'src/Post/Entity/post.entity';
import { users } from 'src/User/Entity/user.emtity';
import { Like } from './entity/like.entity';
import { LikesGateway } from './like.gtaeway';
import { LikesController } from './like.controller';
import { LikesService } from './like.service';


@Module({
    imports: [TypeOrmModule.forFeature([Like, posts, users])],
    providers: [LikesService, LikesGateway],
    controllers: [LikesController],
    exports: [LikesGateway],
})
export class LikesModule { }
