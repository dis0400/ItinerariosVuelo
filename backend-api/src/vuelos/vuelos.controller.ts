import { Controller, Get, Post, Body } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { Vuelo } from './vuelo.entity';
import vuelosData from '../assets/cronograma_vuelos.json';
@Controller('vuelos')
export class VuelosController {
  constructor(private readonly vuelosService: VuelosService) {}

  @Get()
  findAll(): Promise<Vuelo[]> {
    return this.vuelosService.findAll();
  }

  @Post('seed')
  async seed(): Promise<string> {
    await this.vuelosService.seedFromJSON(vuelosData as Vuelo[]);
    return 'Base de datos poblada con cronograma_vuelos.json';
  }

  @Post()
  create(@Body() vuelo: Partial<Vuelo>): Promise<Vuelo> {
    return this.vuelosService.create(vuelo);
  }
}
