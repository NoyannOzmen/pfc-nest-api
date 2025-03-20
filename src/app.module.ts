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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      define: {
        timestamps: false,
        freezeTableName: true
      },
      autoLoadModels: true,
      synchronize: true,
    }),
    AnimalModule,
    AssociationModule,
    DemandeModule,
    EspeceModule,
    FamilleModule,
    MediaModule,
    TagModule,
    UtilisateurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
