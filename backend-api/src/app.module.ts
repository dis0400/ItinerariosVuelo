import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VuelosModule } from './vuelos/vuelos.module';
import { Vuelo } from './vuelos/vuelo.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Tripulante } from './tripulante/tripulante.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'vuelos_db',
      entities: [Vuelo, Tripulante],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Tripulante]),
    VuelosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
