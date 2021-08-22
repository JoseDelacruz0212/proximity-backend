import { hash } from 'bcrypt';
import { Column,
    BeforeInsert,
    Entity,
    BeforeUpdate,
    PrimaryGeneratedColumn, } from 'typeorm';
@Entity({ name: 'usuario' }) //podría cambiarse a usuarios ya que refiere a la bd 
export class Usuario {
    //considerar cambiar todo a ingles
    @PrimaryGeneratedColumn()
    idUsuario: number;
  
    @Column({ type: 'varchar', length: 30, nullable: false })
    nombreUsuario: string;
  
    @Column({ type: 'varchar', length: 30, nullable: false })
    apellidoUsuario: string;
  
    @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
    emailUsuario: string;
  
    @Column({ type: 'varchar', length: 250, nullable: false, select: false  })
    passwordUsuario: string;
    //definir estado
    @Column({ type: 'bool', default: true })
    estado: boolean;
    @Column({ type: 'simple-array' })
    roles: string[];
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.passwordUsuario) {
      return;
    }
    this.passwordUsuario = await hash(this.passwordUsuario, 10);

}
}