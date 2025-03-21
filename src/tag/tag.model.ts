import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Animal } from 'src/animal/animal.model';

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

@Table
export class Animal_Tag extends Model {
  @ForeignKey(() => Animal)
  @Column
  declare animal_id: number;

  @ForeignKey(() => Tag)
  @Column
  declare tag_id: number;
}
