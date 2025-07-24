import { Module } from '@nestjs/common';
import { RecommendController } from './recommend.controller';
import { MenuService } from './menu.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [RecommendController],
  providers: [MenuService],
})
export class AppModule {}
