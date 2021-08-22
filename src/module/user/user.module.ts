import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
 