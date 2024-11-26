

import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CommentDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    comment: string;
}

export class DelCommentDto {

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsNumber()
    @IsNotEmpty()
    commentId: number;
}

export class getCommentsDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;
}


export class replieDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsNumber()
    @IsNotEmpty()
    commentId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}