import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService:AuthService
    ){
        super({
            usernameField:'emailUsuario',
            passwordField:'passwordUsuario'
        })
    }
    async validate(emailUsuario:string,passwordUsuario:string){
       
        const user= await this.authService.validateUser(emailUsuario,passwordUsuario);
        if(!user)throw new UnauthorizedException('Datos incorrectos o aún no estas autorizado para logearte');
        return user;
    }

}