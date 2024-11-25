
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class ReportDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    report: string;
}