import { UserDTO } from './user.dto';
import { User } from './user.model';

export interface UsersRepository {

    getAllUsers(): User[] | Promise<User[]>;

    getUserById(id: string): User | Promise<User>;

    newUser(user: UserDTO): User | Promise<User>;

    updateUser(id: string, user: UserDTO): User | Promise<User>;

    deleteUser(id: string): void;

}
