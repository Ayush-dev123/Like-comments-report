import { Controller, Post, Body, Get } from '@nestjs/common';
import { LikeCountDto, LikeDto, unLikeDto } from './dto/like.dto';
import { LikesGateway } from './like.gtaeway';
import { LikesService } from './like.service';


@Controller('likes')
export class LikesController {
    constructor(
        private readonly likesService: LikesService,
        private readonly likesGateway: LikesGateway,
    ) { }

    @Post()
    async likePost(@Body() likeDto: LikeDto) {
        const like = await this.likesService.likePost(likeDto);
        const message = `Your post was liked by ${like.user.name}`;
        this.likesGateway.notifyPostOwner(like.postOwner, message);
        return { success: true, like };
    }

    @Post('unLike_post')
    async unLikePost(@Body() unlikeDto: unLikeDto) {
        const unLike = await this.likesService.unLikePost(unlikeDto);
        // console.log(unLike)
        const unLikedBy = unLike.unLikeBy
        const message = `Your post was unliked by ${unLikedBy}`;
        console.log(unLike)
        this.likesGateway.notifyPostOwner(unLike.postOwnerId, message);
        return { success: true, unLike };
    }

    @Get('get_like_counts')
    async getLikeCounts(@Body() likeCountDto: LikeCountDto) {
        const { postId } = likeCountDto
        console.log(postId)
        const like = await this.likesService.getLikeCount(postId);
        return { success: true, like };
    }
}


