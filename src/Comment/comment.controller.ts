import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { CommentDto, DelCommentDto, getCommentsDto } from './DTO/comment.dto';
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

    @Put('delete_comment')
    async deleteComment(@Body() delCommentDto: DelCommentDto) {
        const deleteComment = await this.commentsService.deleteComment(delCommentDto);
        return { success: true, deleteComment }
    }

    @Get('get_all_comments_byId')
    async getAllComments(@Body() getcommentsDto: getCommentsDto) {
        const allComments = await this.commentsService.getAllComments(getcommentsDto);
        if (allComments.length == 0) {
            return { success: true, message: "No comments found" }
        }
        return { success: true, allComments };
    }
}
