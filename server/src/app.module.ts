import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathController } from './controllers/math';
import { ProductModule } from './product.module';

@Module({
  imports: [ProductModule],
  controllers: [AppController, MathController],
  providers: [AppService],
})
export class AppModule {}
