import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.model";

export class UserDTO {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
    }
}