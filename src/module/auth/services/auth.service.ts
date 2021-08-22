import { Injectable } from '@nestjs/common';
import { UserService } from 'src/module/user/services/user.service';
import {compare}from 'bcrypt';
import { Usuario } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService
    ){}
    async validateUser(emailUsuario:string,passwordUsuario:string):Promise<any>{
        const user= await this.userService.findByEmail({emailUsuario});
        if(user&&  await compare(passwordUsuario,user.passwordUsuario)){
            const { passwordUsuario, ...rest } = user;
            return rest;
        }
        return null;
    }
    login(user: Usuario) {
       console.log(user);
        const { idUsuario, ...rest } = user;
        const payload = { sub: idUsuario };
        return{ 
        user,
          accessToken: this.jwtService.sign(payload),
        }
      }
}
