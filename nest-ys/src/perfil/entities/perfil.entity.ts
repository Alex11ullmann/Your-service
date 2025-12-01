/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { TrabajadorOficio } from 'src/trabajador-oficio/entities/trabajador-oficio.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('perfiles')
export class Perfil {
  @PrimaryGeneratedColumn({ name: 'id_perfiles' })
  id_perfiles: number;

  @Column({ name: 'nombreyapellido', type: 'varchar', length: 25 })
  nombreyapellido: string;

  @Column({ name: 'localidad', type: 'varchar', length: 20 })
  localidad: string;

  @Column({ name: 'direccion', type: 'varchar', length: 20 })
  direccion: string;

  @Column({ name: 'telefono', type: 'varchar' })
  telefono: string;

  @Column({ name: 'dni', type: 'varchar', unique: true })
  dni: string;

  @Column({ name: 'email', type: 'varchar', length: 30, unique: true })
  email: string;

  @Column({ name: 'estrabajador', type: 'boolean' })
  estrabajador: boolean;
  
  @ManyToOne(() => Usuario, (usuario) => usuario.perfiles, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @OneToMany(() => TrabajadorOficio, (trabajo) => trabajo.perfil)
  trabajos: TrabajadorOficio[];
}
