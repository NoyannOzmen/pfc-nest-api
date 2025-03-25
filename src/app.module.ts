import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnimalModule } from './animal/animal.module';
import { AssociationModule } from './association/association.module';
import { DemandeModule } from './demande/demande.module';
import { EspeceModule } from './espece/espece.module';
import { FamilleModule } from './famille/famille.module';
import { MediaModule } from './media/media.module';
import { TagModule } from './tag/tag.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { ConfigModule } from '@nestjs/config';
import { Animal } from './animal/animal.model';
import { Association } from './association/association.model';
import { Demande } from './demande/demande.model';
import { Espece } from './espece/espece.model';
import { Famille } from './famille/famille.model';
import { Media } from './media/media.model';
import { Tag } from './tag/tag.model';
import { Utilisateur } from './utilisateur/utilisateur.model';
import { AuthModule } from './auth/auth.module';
import { AnimalTagModule } from './animal_tag/animal_tag.module';
import { Animal_Tag } from './animal_tag/animal_tag.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      define: {
        timestamps: false,
        freezeTableName: true
      },
      autoLoadModels: true,
      quoteIdentifiers: false,
      synchronize: true,
      models: [Animal, Association, Demande, Espece, Famille, Media, Tag, Animal_Tag, Utilisateur]
    }),
    AnimalModule,
    AssociationModule,
    DemandeModule,
    EspeceModule,
    FamilleModule,
    MediaModule,
    TagModule,
    UtilisateurModule,
    AuthModule,
    AnimalTagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
