import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TrabajadorOficio } from '../../trabajador-oficio/entities/trabajador-oficio.entity';

@Entity('oficios')
export class Oficio {
  @PrimaryGeneratedColumn({ name: 'id_oficios' })
  id_oficios: number;

  @Column({ name: 'nombre_oficio', type: 'varchar', length: 40 })
  nombre_oficio: string;

  @OneToMany(() => TrabajadorOficio, (rel) => rel.oficio)
  oficios: TrabajadorOficio[];
}
