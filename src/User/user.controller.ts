import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';
// import { LikesService } from './likes.service';
// import { LikeDto } from './dto/like.dto';
// import { LikesGateway } from './likes.gateway';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,

    ) { }

    @Post()
    async users(@Body() data: any) {
        const like = await this.usersService.user(data);


        return data;
    }
}
