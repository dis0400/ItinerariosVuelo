import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tripulante } from './tripulante/tripulante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Tripulante)
    private tripulanteRepo: Repository<Tripulante>,
  ) {}

  guardarTripulante(nombre: string, base: string) {
    const tripulante = this.tripulanteRepo.create({ nombre, base });
    return this.tripulanteRepo.save(tripulante);
  }
}
