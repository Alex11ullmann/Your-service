import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Oficio } from '../../oficio/entities/oficio.entity';

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

  @Column({ name: 'telefono', type: 'int' })
  telefono: number;

  @Column({ name: 'dni', type: 'int', unique: true })
  dni: number;

  @Column({ name: 'email', type: 'varchar', length: 30, unique: true })
  email: string;

  @Column({ name: 'estrabajador', type: 'boolean' })
  estrabajador: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.perfiles, { nullable: false })
  @JoinColumn({ name: 'id_usuarios' })
  usuario: Usuario;

  @ManyToOne(() => Oficio, (oficio) => oficio.perfiles, { nullable: false })
  @JoinColumn({ name: 'id_oficios' })
  oficio: Oficio;
}
