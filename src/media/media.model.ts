import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Animal } from 'src/animal/animal.model';
import { Association } from 'src/association/association.model';

@Table
export class Media extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ordre: number;

  @ForeignKey(() => Association)
  @Column
  declare association_id: number;

  @BelongsTo(() => Association)
  declare association: Association;

  @ForeignKey(() => Animal)
  @Column
  declare animal_id: number;

  @BelongsTo(() => Animal)
  declare animal: Animal;
}
