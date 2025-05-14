import { Injectable } from '@nestjs/common';
import { CreatemsmDto } from './dto/create-msm.dto';
import { UpdatemsmDto } from './dto/update-msm.dto';

import { Monster } from './entities/msm.entity'; 
import { FileService } from '../file.service';

/*      */
@Injectable()
export class msmService {
  constructor(private readonly fileService: FileService<Monster[]>) {}

  findAll(name?: string): Monster[] {
    const monsters = this.fileService.read();

    return name
      ? monsters.filter((monster) =>
          monster.name.toLowerCase().includes(name.toLowerCase())
        )
      : monsters;
  }

  create(createmsmDto: CreatemsmDto) {
    const monsters = this.fileService.read();

    // для простоты новый id = текущее количество карточек + 1
    const monster = {  id: monsters.length + 1, ...createmsmDto };

    this.fileService.add(monster);
  }

  findOne(id: number): Monster | null {
    const monsters = this.fileService.read();

    return monsters.find((monster) => monster.id === id) ?? null;
  }

  update(id: number, updatemsmDto: UpdatemsmDto): void {
    const monsters = this.fileService.read();

    const updatedmsm = monsters.map((monster) =>
      monster.id === id ? { ...monster, ...updatemsmDto } : monster,
    );

    this.fileService.write(updatedmsm);
  }

  remove(id: number): void {
    const filteredmsm = this.fileService
      .read()
      .filter((stock) => stock.id !== id);

    this.fileService.write(filteredmsm);
  }
}