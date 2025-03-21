import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Animal } from 'src/animal/animal.model';
import { Demande } from 'src/demande/demande.model';
import { Utilisateur } from 'src/utilisateur/utilisateur.model';

@Table
export class Famille extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare nom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare prenom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare telephone: string;

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
  declare hebergement: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare terrain: string;

  @HasMany(() => Animal)
  declare animaux: Animal[];

  @ForeignKey(() => Utilisateur)
  @Column
  declare utilisateur_id: number;

  @BelongsTo(() => Utilisateur)
  declare identifiant_famille: Utilisateur;

  @BelongsToMany(() => Animal, () => Demande)
  declare demandes: Animal[];
}
