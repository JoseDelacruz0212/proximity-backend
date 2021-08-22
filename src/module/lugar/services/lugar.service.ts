import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lugar } from 'src/entity/lugar.entity';
import { Repository } from 'typeorm';
import { LugarDto } from '../dtos/lugar.dto';

@Injectable()
export class LugarService {
    constructor(
        @InjectRepository(Lugar)
        private lugarRepository: Repository<Lugar>,
      ) {}
    
      async getAll(): Promise<Lugar[]> {
        const list = await this.lugarRepository.find();
        if (!list.length) {
          throw new NotFoundException({ mesage: 'la lista está vacía' });
        }
        return list;
      }
      async findById(id: number): Promise<Lugar> {
        const lugar = await this.lugarRepository.findOne(id);
        if (!lugar) {
          throw new NotFoundException({ mesage: 'no existe' });
        }
        return lugar;
      }
      async findByNombre(nombre: string): Promise<Lugar> {
        const lugar = await this.lugarRepository.findOne({ nombreLugar: nombre });
        return lugar;
      }
      
      async create(dto: LugarDto): Promise<any> {
        const lugar = await this.lugarRepository.create(dto);
        await this.lugarRepository.save(lugar);
        return { message: `lugar ${lugar.nombreLugar} creado` };
      }
    
      async update(id: number, dto: LugarDto): Promise<any> {
        const lugar = await this.findById(id);
        dto.nombreLugar
          ? (lugar.nombreLugar = dto.nombreLugar)
          : (lugar.nombreLugar = lugar.nombreLugar);
        dto.estadoLugar
          ? (lugar.estadoLugar = dto.estadoLugar)
          : (lugar.estadoLugar = lugar.estadoLugar);
        dto.latitud
          ? (lugar.latitud = dto.latitud)
          : (lugar.latitud = lugar.latitud);
        dto.longitud
          ? (lugar.longitud = dto.longitud)
          : (lugar.longitud = lugar.longitud);
        await this.lugarRepository.save(lugar);
        return { message: `lugar ${lugar.nombreLugar} actualizado` };
      }
      async delete(id: number): Promise<any> {
        const lugar = await this.findById(id);
        await this.lugarRepository.delete(lugar);
        return { message: `lugar ${lugar.nombreLugar} eliminado` };
      }
}
