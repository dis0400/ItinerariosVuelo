import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vuelo } from './vuelo.entity';

@Injectable()
export class VuelosService {
  constructor(
    @InjectRepository(Vuelo)
    private vuelosRepository: Repository<Vuelo>,
  ) {}

  findAll(): Promise<Vuelo[]> {
    return this.vuelosRepository.find();
  }

  create(vuelo: Partial<Vuelo>): Promise<Vuelo> {
    return this.vuelosRepository.save(vuelo);
  }

  async seedFromJSON(data: Vuelo[]): Promise<void> {
    for (const vuelo of data) {
      await this.vuelosRepository.save(vuelo);
    }
  }
}
