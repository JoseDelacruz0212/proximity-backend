import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lugar } from 'src/entity/lugar.entity';
import { LugarController } from './controller/lugar.controller';
import { LugarService } from './services/lugar.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([Lugar])
  ],
  providers: [LugarService],
  controllers: [LugarController],
  exports:[LugarService]
})
export class LugarModule {}
