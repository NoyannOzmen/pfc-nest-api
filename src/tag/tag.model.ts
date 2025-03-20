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
  nom: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => Animal, () => Animal_Tag)
  animaux_taggés: Animal[];
}

@Table
export class Animal_Tag extends Model {
  @ForeignKey(() => Animal)
  @Column
  animal_id: number;

  @ForeignKey(() => Tag)
  @Column
  tag_id: number;
}
