import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendModule } from './recommend/recommend.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      //Configuracion de Forma Global para archivos
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    RecommendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
