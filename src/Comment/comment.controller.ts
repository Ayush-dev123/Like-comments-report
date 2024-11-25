import { Controller, Post, Body, Get } from '@nestjs/common';
// import { LikesGateway } from './like.gtaeway';
import { CommentDto } from './DTO/comment.dto';
import { CommentsService } from './comment.service';
import { LikesGateway } from 'src/Like/like.gtaeway';


@Controller('comments')
export class CommentController {
    constructor(
        private readonly commentsService: CommentsService,
        private readonly likesGateway: LikesGateway,
    ) { }

    @Post('add_comment')
    async addComment(@Body() commentDto: CommentDto) {
        const comments = await this.commentsService.addComment(commentDto);

        const message = `${comments.commentedBy} commented on your post`;

        this.likesGateway.notifyPostOwner(comments.postowner, message);

        return { success: true, comments };
    }

    // @Post('unLike_post')
    // async unLikePost(@Body() unlikeDto: unLikeDto) {
    //     const unLike = await this.likesService.unLikePost(unlikeDto);
    //     // console.log(unLike)
    //     const unLikedBy = unLike.unLikeBy
    //     const message = `Your post was unliked by ${unLikedBy}`;
    //     console.log(unLike)
    //     this.likesGateway.notifyPostOwner(unLike.postOwnerId, message);
    //     return { success: true, unLike };
    // }

    // @Get('get_like_counts')
    // async getLikeCounts(@Body() likeCountDto: LikeCountDto) {
    //     const { postId } = likeCountDto
    //     console.log(postId)
    //     const like = await this.likesService.getLikeCount(postId);
    //     return { success: true, like };
    // }
}
