import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Demande } from './demande.model';
import { Op } from 'sequelize';
import { Famille } from 'src/famille/famille.model';
import { Animal } from 'src/animal/animal.model';

@Injectable()
export class DemandeService {
  constructor(
    @InjectModel(Demande)
    private demandeModel: typeof Demande,
  ) {}

  async create(createDemandeDto: CreateDemandeDto) {
    const request = await this.demandeModel.create({ ...createDemandeDto });
    return 'Request successfully created';
  }

  async findAll(): Promise<Demande[]> {
    const requests = await this.demandeModel.findAll();
    return requests
  }

  async findOne(id: string): Promise<Demande> {
    const request = await this.demandeModel.findByPk(id,
      {
        include: [
          { model: Famille, as: "famille"},
          { model: Animal, as: "animal", include: ['tags', 'espece', 'images_animal']},
        ]
      }
    );

    if (!request) {
      throw new NotFoundException({
        status: 'error',
        message: `Request with id ${id} does not exist`,
      });
    }
    return request
  }

    async findByExisting(familleId: number, animalId : number): Promise<Demande | null> {
      return this.demandeModel.findOne({
        where :{ 
          [Op.and] : [
            {famille_id: familleId},
            {animal_id: animalId}
          ]}
        })
    }

    async findOthers(animalId : number, id : number) : Promise<Demande[] | null> {
      return this.demandeModel.findAll({
        where :{
          animal_id: animalId,
          [Op.not]: {
              id : id
          }
      }
      })
    }

  async update(id: string, updateDemandeDto: UpdateDemandeDto) : Promise<Demande> {
    const request = await this.demandeModel.findByPk(id);

    if (!request) {
      throw new NotFoundException({
        status: 'error',
        message: `Request with id ${id} does not exist`,
      });
    }
    await request.update(updateDemandeDto);
    return request;
  }

  async remove(id: string) {
    const demande = await this.findOne(id);
    await demande?.destroy();
    return `Succesfully removed #${id} request`;
  }
}
