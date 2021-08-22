import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EditUserDto } from '../dtos/edit-user.dto';
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
      async findById(id: number,usuarioEntity?:Usuario): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne(id)
        .then(u => (!usuarioEntity ? u : !!u && usuarioEntity.idUsuario === u.idUsuario ? u : null));
        if (!usuario) {
          throw new NotFoundException({ mesage: 'Usuario no existe o no autorizado para realizar cambios' });
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
    
      async update(id: number, dto: EditUserDto,usuarioEntity?:Usuario): Promise<any> {
        const usuario = await this.findById(id,usuarioEntity);
        const editedUser = Object.assign(usuario, dto);
        return await this.usuarioRepository.save(usuario);
        //return { message: `usuario ${usuario.nombreUsuario} actualizado` };
      }
      async delete(id: number,usuarioEntity?:Usuario): Promise<any> {
        const usuario = await this.findById(id,usuarioEntity);
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
