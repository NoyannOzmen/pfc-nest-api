import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Animal } from 'src/animal/animal.model';

@Table
export class Espece extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare nom: string;

  @HasMany(() => Animal)
  declare representants: Animal[];
}
