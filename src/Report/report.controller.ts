import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportDto } from './Dto/report.dto';
import { LikesGateway } from 'src/Like/like.gtaeway';




@Controller('report')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly likesGateway: LikesGateway,
    ) { }

    @Post()
    async addReport(@Body() reportDto: ReportDto) {
        const report = await this.reportService.AddReport(reportDto);
        const message = `Your post was reported by ${report.user.name}`;
        this.likesGateway.notifyPostOwner(report.postOwner, message);
        return { success: true, report };
    }
}