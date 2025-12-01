/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Perfil } from 'src/perfil/entities/perfil.entity';
import { Oficio } from 'src/oficio/entities/oficio.entity';

@Entity('trabajador_oficio')
export class TrabajadorOficio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Perfil, (perfil) => perfil.trabajos, {
    onDelete: 'CASCADE',
  })
  perfil: Perfil;

  @ManyToOne(() => Oficio, (oficio) => oficio.trabajadores, {
    onDelete: 'CASCADE',
  })
  oficio: Oficio;
}
