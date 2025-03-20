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
  nom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  prenom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  telephone: string;

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
  hebergement: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  terrain: string;

  @HasMany(() => Animal)
  animaux: Animal[];

  @ForeignKey(() => Utilisateur)
  @Column
  utilisateur_id: number;

  @BelongsTo(() => Utilisateur)
  identifiant_famille: Utilisateur;

  @BelongsToMany(() => Animal, () => Demande)
  demandes: Animal[];
}
