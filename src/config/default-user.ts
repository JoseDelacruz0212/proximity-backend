import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_USER_APELLIDO, DEFAULT_USER_EMAIL, DEFAULT_USER_NAME, DEFAULT_USER_PASSWORD } from '../config/constants';
import { Usuario } from 'src/entity/user.entity';

const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<Usuario>(Usuario);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('emailUsuario = :emailUsuario', {
        emailUsuario: config.get<string>('DEFAULT_USER_EMAIL'),
    })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
        nombreUsuario: config.get<string>(DEFAULT_USER_NAME),
        apellidoUsuario: config.get<string>(DEFAULT_USER_APELLIDO),
        emailUsuario: config.get<string>(DEFAULT_USER_EMAIL),
        passwordUsuario: config.get<string>(DEFAULT_USER_PASSWORD),
      roles: ['admin'],
    });

    return await userRepository.save(adminUser);
  }
};

export default setDefaultUser; 
