import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { users } from './Entity/user.emtity';


@Module({
    imports: [TypeOrmModule.forFeature([users])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule { }
