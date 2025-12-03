/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Perfil } from '../../perfil/entities/perfil.entity';
import { Oficio } from '../../oficio/entities/oficio.entity';

@Entity('trabajador_oficio')
export class TrabajadorOficio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Perfil, (perfil) => perfil.oficios, {
    onDelete: 'CASCADE',
  })
  perfil: Perfil;

  @ManyToOne(() => Oficio, (oficio) => oficio.oficios, {
    onDelete: 'CASCADE',
  })
  oficio: Oficio;
}
