import { Module } from '@nestjs/common';
import { RecommendController } from './recommend.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [RecommendController],
  providers: [MenuService],
})
export class RecommendModule {}
