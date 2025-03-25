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
import { Animal_Tag } from 'src/animal_tag/animal_tag.model';
import { Association } from 'src/association/association.model';
import { Demande } from 'src/demande/demande.model';
import { Espece } from 'src/espece/espece.model';
import { Famille } from 'src/famille/famille.model';
import { Media } from 'src/media/media.model';
import { Tag } from 'src/tag/tag.model';

@Table
export class Animal extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare nom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare race: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare couleur: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare age: number;

  @Column({
    type: DataType.ENUM,
    values: ['Mâle', 'Femelle', 'Inconnu'],
    allowNull: false,
  })
  declare sexe: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.ENUM,
    values: ['En refuge', 'Accueilli', 'Adopté'],
    allowNull: false,
  })
  declare statut: string;

  @ForeignKey(() => Espece)
  @Column
  declare espece_id: number;

  @BelongsTo(() => Espece)
  declare espece: Espece;

  @ForeignKey(() => Famille)
  @Column
  declare famille_id: number;

  @BelongsTo(() => Famille)
  declare accueillant: Famille;

  @ForeignKey(() => Association)
  @Column
  declare association_id: number;

  @BelongsTo(() => Association)
  declare refuge: Association;

  @HasMany(() => Media)
  declare images_animal: Media[];

  @BelongsToMany(() => Tag, () => Animal_Tag)
  declare tags: Tag[];

  @BelongsToMany(() => Famille, () => Demande)
  declare demandes: Famille[];
}
