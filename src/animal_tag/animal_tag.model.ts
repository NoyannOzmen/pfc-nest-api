import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Animal } from 'src/animal/animal.model';
import { Tag } from 'src/tag/tag.model';

@Table
export class Animal_Tag extends Model {
  @ForeignKey(() => Animal)
  @Column
  declare animal_id: number;

  @ForeignKey(() => Tag)
  @Column
  declare tag_id: number;
}
