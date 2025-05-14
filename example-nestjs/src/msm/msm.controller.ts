import { Controller, Get, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Monster } from './entities/msm.entity';
import { msmService } from './msm.service';
import { CreatemsmDto } from './dto/create-msm.dto';
import { UpdatemsmDto } from './dto/update-msm.dto';

@Controller('msm')
export class msmController {
    constructor(private readonly msmService: msmService) {}

    @Post()
    create(@Body() createmsmDto: CreatemsmDto) {
        return this.msmService.create(createmsmDto);
    }

    @Get()
    findAll(@Query('name') name?: string): Monster[] {
      return this.msmService.findAll(name);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.msmService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatemsmDto: UpdatemsmDto) {
        return this.msmService.update(+id, updatemsmDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.msmService.remove(+id);
    }
}