import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
export interface UserFindOne{
    idUsuario?:number;
    emailUsuario?:string;
}
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
      ) {}
    
      async getAll(): Promise<Usuario[]> {
        const list = await this.usuarioRepository.find();
        if (!list.length) {
          throw new NotFoundException({ mesage: 'la lista está vacía' });
        }
        return list;
      }
      async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne(id);
        if (!usuario) {
          throw new NotFoundException({ mesage: 'no existe' });
        }
        return usuario;
      }
      async findByNombre(nombre: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
          nombreUsuario: nombre,
        });
        return usuario;
      }
      async create(dto: CreateUserDto): Promise<any> {
        const nuevoUsuario = await this.usuarioRepository.create(dto);
        await this.usuarioRepository.save(nuevoUsuario);
        return { message: `usuario ${nuevoUsuario.nombreUsuario} creado` };
      }
    
      async update(id: number, dto: CreateUserDto): Promise<any> {
        const usuario = await this.findById(id);
        dto.nombreUsuario
          ? (usuario.nombreUsuario = dto.nombreUsuario)
          : (usuario.nombreUsuario = usuario.nombreUsuario);
        dto.apellidoUsuario
          ? (usuario.apellidoUsuario = dto.apellidoUsuario)
          : (usuario.apellidoUsuario = usuario.apellidoUsuario);
        dto.emailUsuario
          ? (usuario.emailUsuario = dto.emailUsuario)
          : (usuario.emailUsuario = usuario.emailUsuario);
        dto.passwordUsuario
          ? (usuario.passwordUsuario = dto.passwordUsuario)
          : (usuario.passwordUsuario = usuario.passwordUsuario);
        dto.rolId ? (usuario.rolId = dto.rolId) : (usuario.rolId = usuario.rolId);
        await this.usuarioRepository.save(usuario);
        return { message: `usuario ${usuario.nombreUsuario} actualizado` };
      }
      async delete(id: number): Promise<any> {
        const usuario = await this.findById(id);
        await this.usuarioRepository.delete(usuario);
        return { message: `usuario ${usuario.nombreUsuario} eliminado` };
      }
      async findByEmail(data:UserFindOne){
          return await this.usuarioRepository
          .createQueryBuilder('usuario')
          .where(data)
          .addSelect('usuario.passwordUsuario')
          .getOne()
      }
}
