import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { msmModule } from './msm/msm.module';

@Module({
  imports: [msmModule],
})
export class AppModule {}
