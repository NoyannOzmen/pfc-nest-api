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
  url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ordre: number;

  @ForeignKey(() => Association)
  @Column
  association_id: number;

  @BelongsTo(() => Association)
  association: Association;

  @ForeignKey(() => Animal)
  @Column
  animal_id: number;

  @BelongsTo(() => Animal)
  animal: Animal;
}
