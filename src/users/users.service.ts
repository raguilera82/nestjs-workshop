import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User } from './user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(@Inject('usersRepository') private usersRepository: UsersRepository){}

    async getAllUsers(): Promise<UserDTO[]> {
        const users: User[] = await this.usersRepository.getAllUsers()
        return users.map(user => new UserDTO(user));
    }

    async getUserById(id: string): Promise<UserDTO> {
        const user: User = await this.usersRepository.getUserById(id);
        return new UserDTO(user);
    }

    async newUser(user: UserDTO): Promise<UserDTO> {
        const newUser: User = await this.usersRepository.newUser(user)
        return new UserDTO(newUser);
    }

    async updateUser(id: string, user: UserDTO): Promise<UserDTO> {
        const updateUser = await this.usersRepository.updateUser(id, user);
        return new UserDTO(updateUser);
    }

    deleteUser(id: string) {
        this.usersRepository.deleteUser(id);
    }

}
