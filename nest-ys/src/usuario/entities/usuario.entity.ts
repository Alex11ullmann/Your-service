import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Perfil } from '../../perfil/entities/perfil.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuarios' })
  id_usuarios: number;

  @Column({ name: 'usuario', type: 'varchar', length: 12, unique: true })
  usuario: string;

  @Column({ name: 'contraseña', type: 'varchar', length: 20 })
  contraseña: string;

  @OneToMany(() => Perfil, (perfil) => perfil.usuario)
  perfiles: Perfil[];
}
