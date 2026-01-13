import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import { Animal } from 'src/animal/animal.model';
import { Famille } from 'src/famille/famille.model';

@Table
export class Demande extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: any;

  @Column({
    type: DataType.ENUM,
    values: ['En attente', 'Validée', 'Refusée'],
    allowNull: false,
  })
  declare statut_demande: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare date_debut: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare date_fin: Date;

  @ForeignKey(() => Animal)
  @Column
  declare animal_id: number;

  @BelongsTo(() => Animal)
  declare animal: Animal;

  @ForeignKey(() => Famille)
  @Column
  declare famille_id: number;

  @BelongsTo(() => Famille)
  declare famille: Famille;
}
