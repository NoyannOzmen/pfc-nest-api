import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { Association } from 'src/association/association.model';
import { Famille } from 'src/famille/famille.model';

@Table
export class Utilisateur extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  mot_de_passe: string;

  @HasOne(() => Association)
  refuge: Association;

  @HasOne(() => Famille)
  accueillant: Famille;
}
