import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class LikeDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}

export class LikeCountDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;
}

export class unLikeDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
