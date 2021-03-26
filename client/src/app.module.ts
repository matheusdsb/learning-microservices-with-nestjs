import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathController } from './math.controller';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'MATH_SERVICE', transport: Transport.TCP, options: {
        host: 'localhost',
        port: 3001
      } }
    ])
  ],
  controllers: [AppController, MathController],
  providers: [AppService],
})
export class AppModule {}
