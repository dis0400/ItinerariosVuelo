import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vuelo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: string;

  @Column()
  origen: string;

  @Column()
  destino: string;

  @Column()
  horaSalidaUTC: string;

  @Column()
  horaLlegadaUTC: string;

  @Column()
  aerolinea: string;

  @Column()
  avion: string;

  @Column()
  tipoVuelo: string;

  @Column()
  nombreTripulante: string;
}
