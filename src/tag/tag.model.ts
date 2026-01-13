import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Animal } from 'src/animal/animal.model';
import { Animal_Tag } from 'src/animal_tag/animal_tag.model';

@Table
export class Tag extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare nom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @BelongsToMany(() => Animal, () => Animal_Tag)
  declare animaux_taggés: Animal[];
}
