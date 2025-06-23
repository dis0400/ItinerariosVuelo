import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tripulante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  base: string;
}
