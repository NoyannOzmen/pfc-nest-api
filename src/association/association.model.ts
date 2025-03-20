import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Animal } from 'src/animal/animal.model';
import { Media } from 'src/media/media.model';
import { Utilisateur } from 'src/utilisateur/utilisateur.model';

@Table
export class Association extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  nom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  responsable: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  rue: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  commune: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  code_postal: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  pays: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  siret: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  telephone: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  site: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @HasMany(() => Animal)
  pensionnaires: Animal[];

  @HasMany(() => Media)
  images_association: Media[];

  @ForeignKey(() => Utilisateur)
  @Column
  utilisateur_id: number;

  @BelongsTo(() => Utilisateur)
  identifiant_association: Utilisateur;
}
