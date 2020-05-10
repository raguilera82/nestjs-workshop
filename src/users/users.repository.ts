import { UserDTO } from './user.dto';

export interface UsersRepository {

    getAllUsers(): UserDTO[];

    getUserById(id: string): UserDTO;

    newUser(user: UserDTO): UserDTO;

    updateUser(id: string, user: UserDTO): UserDTO;

    deleteUser(id: string): void;

}
