import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {

    users: UserDTO[] = [];

    getAllUsers(): UserDTO[] {
        return this.users;
    }

    getUserById(id: string): UserDTO {
        const user = this.users.find(user => user.id == id);
        return user;
    }

    newUser(user: UserDTO): UserDTO {
        const newUser = {...user, id: ''+(this.users.length)}
        this.users = [...this.users, newUser];
        return newUser;
    }

    updateUser(id: string, user: UserDTO): UserDTO {
        this.users = this.users.filter(user => user.id !== id);
        this.users = [...this.users, this.newUser(user)];
        return user;
    }

    deleteUser(id: string) {
        this.users = this.users.filter(user => user.id !== id);
    }

}