import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  imports: [],
  controllers: [HealthController], // añade aquí
  providers: [],
})
export class HealthModule {}
