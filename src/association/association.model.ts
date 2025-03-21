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
  declare nom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare responsable: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare rue: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare commune: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare code_postal: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare pays: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare siret: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare telephone: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare site: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @HasMany(() => Animal)
  declare pensionnaires: Animal[];

  @HasMany(() => Media)
  declare images_association: Media[];

  @ForeignKey(() => Utilisateur)
  @Column
  declare utilisateur_id: number;

  @BelongsTo(() => Utilisateur)
  declare identifiant_association: Utilisateur;
}
