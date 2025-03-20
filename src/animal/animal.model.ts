import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Association } from 'src/association/association.model';
import { Demande } from 'src/demande/demande.model';
import { Espece } from 'src/espece/espece.model';
import { Famille } from 'src/famille/famille.model';
import { Media } from 'src/media/media.model';
import { Animal_Tag, Tag } from 'src/tag/tag.model';

@Table
export class Animal extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  nom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  race: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  couleur: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.ENUM,
    values: ['Mâle', 'Femelle', 'Inconnu'],
    allowNull: false,
  })
  sexe: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.ENUM,
    values: ['En refuge', 'Accueilli', 'Adopté'],
    allowNull: false,
  })
  statut: string;

  @ForeignKey(() => Espece)
  @Column
  espece_id: number;

  @BelongsTo(() => Espece)
  espece: Espece;

  @ForeignKey(() => Famille)
  @Column
  famille_id: number;

  @BelongsTo(() => Famille)
  accueillant: Famille;

  @ForeignKey(() => Association)
  @Column
  association_id: number;

  @BelongsTo(() => Association)
  refuge: Association;

  @HasMany(() => Media)
  images_animal: Media[];

  @BelongsToMany(() => Tag, () => Animal_Tag)
  tags: Tag[];

  @BelongsToMany(() => Famille, () => Demande)
  potentiel_accueillant: Famille[];
}
