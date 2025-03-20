import { Injectable } from '@nestjs/common';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Demande } from './demande.model';

@Injectable()
export class DemandeService {
  constructor(
    @InjectModel(Demande)
    private demandeModel: typeof Demande,
  ) {}

  create(createDemandeDto: CreateDemandeDto) {
    return 'This action adds a new demande';
  }

  async findAll(): Promise<Demande[]> {
    return this.demandeModel.findAll();
  }

  findOne(id: string): Promise<Demande | null> {
    return this.demandeModel.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateDemandeDto: UpdateDemandeDto) {
    return `This action updates a #${id} demande`;
  }

  async remove(id: string): Promise<void> {
    const demande = await this.findOne(id);
    await demande?.destroy();
  }
}
