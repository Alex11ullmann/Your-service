import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Perfil } from '../../perfil/entities/perfil.entity';

@Entity('oficios')
export class Oficio {
  @PrimaryGeneratedColumn({ name: 'id_oficios' })
  id_oficios: number;

  @Column({ name: 'nombre_oficio', type: 'varchar', length: 40 })
  nombre_oficio: string;

  @Column({ name: 'sobre_mi', type: 'varchar', length: 600, nullable: true })
  sobre_mi: string | null;

  @OneToMany(() => Perfil, (perfil) => perfil.oficio)
  perfiles: Perfil[];
}
