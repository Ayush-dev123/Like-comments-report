import { Controller, Post, Body } from '@nestjs/common';
import { PostsService } from './post.service';


@Controller('users')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,

    ) { }

    @Post()
    async users(@Body() data: any) {
        const like = await this.postsService.post(data);
        return data;
    }
}
