/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { TrabajadorOficio } from '../../trabajador-oficio/entities/trabajador-oficio.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('perfiles')
export class Perfil {
  @PrimaryGeneratedColumn({ name: 'id_perfiles' })
  id_perfiles: number;

  @Column({ name: 'nombresYApellidos', type: 'varchar', length: 25 })
  nombresYApellidos: string;

  @Column({ name: 'localidad', type: 'varchar', length: 20 })
  localidad: string;

  @Column({ name: 'direccion', type: 'varchar', length: 20 })
  direccion: string;

  @Column({ name: 'telefono', type: 'varchar', length: 10 })
  telefono: string;

  @Column({ name: 'dni', type: 'varchar', length: 8, unique: true })
  dni: string;

  @Column({ name: 'email', type: 'varchar', length: 30, unique: true })
  email: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 600, })
  descripcion?: string;

  @Column({ name: 'estrabajador', type: 'boolean' })
  estrabajador: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.perfil, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @OneToMany(() => TrabajadorOficio, (rel) => rel.perfil)
  oficios: TrabajadorOficio[];
}
