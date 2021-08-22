import { ApiProperty } from "@nestjs/swagger";
import {  IsArray, IsBoolean, IsEmail, IsEnum, isEnum, IsNotEmpty,IsString } from "class-validator";
import { AppRoles } from "src/app.roles";

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
    @IsNotEmpty()
    @IsBoolean()
    estado:boolean;
    @ApiProperty()
    @IsArray()
    @IsEnum(AppRoles,{
        each:true
    })
    roles: string[];
}
