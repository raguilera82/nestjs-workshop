import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersInmemoryRepositoryService implements UsersRepository{

    users: User[] = [];

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: string): User {
        const user = this.users.find(user => user.id == id);
        return user;
    }

    newUser(user: User): User {
        const newUser = {...user, id: ''+(this.users.length)}
        this.users = [...this.users, newUser];
        return newUser;
    }

    updateUser(id: string, user: User): User {
        this.users = this.users.filter(user => user.id !== id);
        this.users = [...this.users, this.newUser(user)];
        return user;
    }

    deleteUser(id: string): void {
        this.users = this.users.filter(user => user.id !== id);
    }

}
