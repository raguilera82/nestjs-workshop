import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string;

}