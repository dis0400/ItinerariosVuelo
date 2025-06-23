import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('tripulantes')
  guardarTripulante(@Body() body: { nombre: string; base: string }) {
    console.log('📦 Tripulante recibido desde app móvil:');
    console.log('🧑‍✈️ Nombre:', body.nombre);
    console.log('📍 Base:', body.base);
    return { message: 'Tripulante guardado exitosamente' };
     return this.appService.guardarTripulante(body.nombre, body.base);
  }
}
