import { Module } from '@nestjs/common';
import { msmService } from './msm.service';
import { msmController } from './msm.controller';

import { FileService } from '../file.service'; 
import { Monster } from './entities/msm.entity'; 

@Module({
  controllers: [msmController],
  providers: [
    msmService,
    {
      provide: FileService,
      useFactory: () => new FileService<Monster[]>('assets/msm.json'),
    },
  ],
})
export class msmModule {}