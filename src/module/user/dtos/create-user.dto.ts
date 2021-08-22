import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
    idUsuario?: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombreUsuario?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    apellidoUsuario?: string;
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    emailUsuario?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    passwordUsuario?: string;
    @ApiProperty()
    rolId?: number;
}
