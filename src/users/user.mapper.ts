import { UserDTO } from "./user.dto";
import { UserEntity } from "./user.entity";

export class UserMapper {

    dtoToEntity(userDTO: UserDTO): UserEntity {
        const userEntity: UserEntity = new UserEntity();
        userEntity.userId = userDTO.id;
        userEntity.name = userDTO.name;
        return userEntity;
    }

    entityToDto(userEntity: UserEntity): UserDTO {
        const userDTO: UserDTO = new UserDTO();
        userDTO.id = userEntity.userId;
        userDTO.name = userEntity.name;
        return userDTO;
    }

}