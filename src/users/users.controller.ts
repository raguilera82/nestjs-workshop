import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    getAllUsers(): UserDTO[] {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: string): UserDTO {
        return this.usersService.getUserById(id);
    }

    @Post()
    newUser(@Body() user: UserDTO): UserDTO {
        return this.usersService.newUser(user);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: UserDTO): UserDTO {
        return this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        this.usersService.deleteUser(id);
    }

}
