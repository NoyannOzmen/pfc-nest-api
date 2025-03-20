import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Animal } from 'src/animal/animal.model';
import { Famille } from 'src/famille/famille.model';

@Table
export class Demande extends Model {
  @Column({
    type: DataType.ENUM,
    values: ['En attente', 'Validée', 'Refusée'],
    allowNull: false,
  })
  statut_demande: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date_debut: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date_fin: Date;

  @ForeignKey(() => Animal)
  @Column
  animal_id: number;
  
  @BelongsTo(() => Animal)
  animal: Animal;

  @ForeignKey(() => Famille)
  @Column
  famille_id: number;

  @BelongsTo(() => Famille)
  famille: Famille;
}
