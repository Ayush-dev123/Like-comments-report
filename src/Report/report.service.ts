import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { Like } from './entity/like.entity';
import { posts } from 'src/Post/Entity/post.entity';
import { users } from 'src/User/Entity/user.emtity';
import { ReportDto } from './Dto/report.dto';
import { reports } from './entity/report.entity';


@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(posts) private postsRepository: Repository<posts>,
        @InjectRepository(users) private usersRepository: Repository<users>,
        @InjectRepository(reports) private reportRepository: Repository<reports>,
    ) { }

    async AddReport(reportDto: ReportDto) {
        const { postId, userId, report } = reportDto;


        const isPostExist = await this.postsRepository.findOne({
            where: { id: postId },
            relations: ['user'], // Include the user relation for the post owner
        });

        if (!isPostExist) {
            throw new NotFoundException('No post found with this ID!');
        }


        const isUserExist = await this.usersRepository.findOne({ where: { id: userId } });
        if (!isUserExist) {
            throw new NotFoundException('No user found with this ID!');
        }
        console.log(isUserExist)


        const newReport = this.reportRepository.create({
            post: isPostExist,
            user: isUserExist,
            postOwner: isPostExist.user.id,
            report: report,
        });
        const reportCreated = await this.reportRepository.save(newReport);
        return reportCreated;
    }



}




