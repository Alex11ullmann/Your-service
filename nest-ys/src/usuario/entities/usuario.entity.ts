import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
