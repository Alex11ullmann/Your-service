import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Perfil } from '../../perfil/entities/perfil.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'usuario', type: 'varchar', length: 12, unique: true })
  usuario: string;

  @Column({ name: 'password', type: 'varchar', length: 20 })
  password: string;

  @OneToMany(() => Perfil, (perfil) => perfil.usuario)
  perfiles: Perfil[];
}
