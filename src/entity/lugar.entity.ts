import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'lugar' })
export class Lugar {
  @PrimaryGeneratedColumn()
  idLugar: number;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  nombreLugar: string;

  @Column({ type: 'tinyint', nullable: false })
  estadoLugar: boolean;

  @Column({ type: 'varchar', length: 20, nullable: false })
  latitud: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  longitud: string;
}
