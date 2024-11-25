// export class CommentDto {
//     postId: number;
//     userId: number;
//     comment: string;
// }



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