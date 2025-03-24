import { BadRequestException, Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Association } from './association.model';
import { Utilisateur } from '../utilisateur/utilisateur.model';
import { SearchBodyDto } from './dto/payload-dto';
import { Op } from 'sequelize';
import { Espece } from '../espece/espece.model';
import { Animal } from '../animal/animal.model';
import { Media } from '../media/media.model';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AssociationService {
  constructor(
    @InjectModel(Association)
    private associationModel: typeof Association,
    private readonly utilisateurService: UtilisateurService
  ) {}

  async registerShelter(
    email: string,
    mot_de_passe: string,
    confirmation: string,
    createAssociationDto: CreateAssociationDto
  ) {
    if (mot_de_passe !== confirmation) {
      throw new BadRequestException('La confirmation du mot de passe ne correspond pas au mot de passe renseigné')
    }
    
    const found = await this.utilisateurService.findByEmail(email);

    if (found) {
      throw new BadRequestException('Cannot proceed')
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 8);

    const newUser = await this.utilisateurService.create({
      email: email,
      mot_de_passe : hashedPassword,
    })

    const newShelter = await this.associationModel.create({ ...createAssociationDto });
    await newShelter.save();
    
    return 'Shelter successfully created';
  }

  async findAll(): Promise<Association[]> {
    const shelters = this.associationModel.findAll({
      include : ["images_association"]
    });
    return shelters
  }

  async search(searchBodyDto : SearchBodyDto): Promise<Association[]> {
    if (searchBodyDto.dptSelectFull) {
        searchBodyDto.dptSelect = searchBodyDto.dptSelectFull
    } else {
        searchBodyDto.dptSelect = searchBodyDto.dptSelectSmall
    }
  
    const associations = await Association.findAll({
      include : [ 
          'images_association',
          { model : Animal, as : "pensionnaires", include : [{ model : Espece, as : "espece" }] }],
          where : {
              nom : (searchBodyDto.shelterNom) ? (searchBodyDto.shelterNom) : { [Op.ne]: null },
              code_postal : (searchBodyDto.dptSelect) ? { [Op.startsWith] : searchBodyDto.dptSelect } : { [Op.ne] : null },
              '$pensionnaires.espece.nom$' : (searchBodyDto.espece ) ? searchBodyDto.espece : { [Op.ne] : null },
          }
      });

    return associations;
  }

  async findOne(id: string): Promise<Association> {
    const shelter = await this.associationModel.findByPk(id, {
      include : [
        "images_association",
        { model : Utilisateur, attributes : ['email']},
        { model : Animal, as : "pensionnaires"}
      ]
    });

    if (!shelter) {
      throw new NotFoundException({
        status: 'error',
        message: `Shelter with id ${id} does not exist`,
      })
    }

    return shelter
  }

  async update(updateAssociationDto: UpdateAssociationDto) : Promise<Association> {
    const id = 1
    //! REMOVE HARDCODED
    const shelter = await this.associationModel.findByPk(id);

    if (!shelter) {
      throw new NotFoundException({
        status: 'error',
        message: `Shelter with id ${id} does not exist`,
      })
    }
    
    await shelter.update(updateAssociationDto);
    return shelter
  }

  async uploadLogo(file: Express.Multer.File) {
    let userImage = file.path;

    const trim = userImage.replace("./assets", "");
    /* const assoId = request.body.assoId; */
    //! REMOVE HARDCODED VALUE AFTER AUTH
    const assoId = 1;
    
    const association = await this.associationModel.findByPk(assoId, {
        include : 'images_association'
    });

    if (!association) {
      throw new NotFoundException({
        status: 'error',
        message: `Shelter with id ${assoId} does not exist`,
      })
    }
      
    const newMedia = await Media.create({
        association_id : association.id,
        url : trim,
        ordre : 1
    })
      
    await newMedia.save();
    return { message : 'File uploaded successfully', association}
  }

  //! Accept Request

  //! Deny Request

  async deleteShelterAccount() {
    const id = 1
    //! REMOVE HARDCODED
    const shelter = await this.findOne(id.toString());

    if (shelter.pensionnaires.length) {
      return { message : 'Vous accueillez actuellement un ou plusieurs animaux enregistrés sur notre site. Merci de contacter le refuge concerné avant de supprimer votre compte !'}
    }

    const user = await this.utilisateurService.findOne(shelter.identifiant_association.id)

    await shelter.destroy();
    await user.destroy();

    return { message : 'Account successfully deleted' };
  }
}
