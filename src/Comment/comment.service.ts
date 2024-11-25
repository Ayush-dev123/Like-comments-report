import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { posts } from 'src/Post/Entity/post.entity';
import { users } from 'src/User/Entity/user.emtity';
import { comments } from './entity/comment.entity';
import { CommentDto } from './DTO/comment.dto';


@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(posts) private postsRepository: Repository<posts>,
        @InjectRepository(comments) private commentsRepository: Repository<comments>,
        @InjectRepository(users) private usersRepository: Repository<users>
    ) { }

    async addComment(commentDto: CommentDto) {
        const { postId, userId, comment } = commentDto;

        const isUserExists = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        })

        if (!isUserExists) {
            throw new NotFoundException('User not found')
        }

        const isPostExist = await this.postsRepository.findOne({
            where: { id: postId },
            relations: ['user'],
        });
        if (!isPostExist) {
            throw new NotFoundException('Post not found');
        } else {
            const comment = this.commentsRepository.create({ userId: commentDto.userId, post: isPostExist, comment: commentDto.comment, postowner: isPostExist.user.id });
            const commentAdded = await this.commentsRepository.save(comment);

            return { ...commentAdded, commentedBy: isUserExists.name }
        }

        // if (isPostExist == null) {
        //     const post = await this.postsRepository.findOne({
        //         where: { id: postId },
        //         relations: ['user'],
        //     });
        //     if (!post) {
        //         throw new NotFoundException('Post not found');
        //     }

        //     const user = await this.usersRepository.findOne({ where: { id: userId } });
        //     if (!user) {
        //         throw new NotFoundException('User not found');
        //     }
        //     const like = this.likesRepository.create({ user, post, postOwner: post.user.id });
        //     return this.likesRepository.save(like);
        // }

        // else if (isLiked.isLiked) {
        //     throw new NotFoundException('You have already liked this post !!');
        // }
        // else {
        //     isLiked.isLiked = true;
        //     await this.likesRepository.save(isLiked);
        // }

    }

    // async unLikePost(unlikeDto: unLikeDto) {
    //     try {
    //         const { postId, userId } = unlikeDto;
    //         const like = await this.likesRepository.findOne({
    //             where: { user: { id: userId }, post: { id: postId } },
    //         });

    //         if (!like) {
    //             throw new NotFoundException('Like not found');
    //         }

    //         like.isLiked = false;
    //         await this.likesRepository.save(like);
    //         const unLikeBy = like.user.name
    //         const postOwnerId = like.postOwner


    //         return { success: true, message: 'Post unliked successfully', unLikeBy, postOwnerId };



    //     } catch (error) {

    //     }
    // }

    // async getLikeCount(postId: number) {
    //     const post = await this.postsRepository.findOne({
    //         where: { id: postId },
    //         relations: ['user'],
    //     });

    //     if (!post) {
    //         throw new NotFoundException('Post not found');
    //     }

    //     const likeCount = await this.likesRepository.count({
    //         where: { post: { id: postId }, isLiked: true },
    //     });



    //     return {
    //         postId: postId,
    //         likeCount: likeCount,
    //     };
    // }



}

