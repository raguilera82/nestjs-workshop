import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(@Inject('usersRepository') private usersRepository: UsersRepository){}

    getAllUsers(): UserDTO[] {
        return this.usersRepository.getAllUsers();
    }

    getUserById(id: string): UserDTO {
        return this.usersRepository.getUserById(id);
    }

    newUser(user: UserDTO): UserDTO {
        return this.usersRepository.newUser(user);
    }

    updateUser(id: string, user: UserDTO): UserDTO {
        return this.usersRepository.updateUser(id, user);
    }

    deleteUser(id: string) {
        this.usersRepository.deleteUser(id);
    }

}
