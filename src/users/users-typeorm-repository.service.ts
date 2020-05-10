import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersTypeormRepositoryService implements UsersRepository{

    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>){}

    getAllUsers(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    getUserById(id: string): Promise<UserEntity> {
        return this.usersRepository.findOne(id);
    }

    newUser(user: UserDTO): Promise<UserEntity> {
        const newUser = new UserEntity();
        newUser.name = user.name;
        return this.usersRepository.save(newUser);
    }

    async updateUser(id: string, user: UserDTO): Promise<UserEntity> {
        const updateUser: UserEntity = await this.usersRepository.findOne(id);
        updateUser.name = user.name;
        return this.usersRepository.save(updateUser);

    }

    async deleteUser(id: string): Promise<void> {
       await this.usersRepository.delete(id);
    }

}
