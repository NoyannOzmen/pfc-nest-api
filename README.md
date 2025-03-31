# Pet Foster Connect

<img src="./front/public/icons/logo.svg" alt="Logo de PetFosterConnect" width="300"/>

## Disclaimer

Ce dépôt contient une conversion en NestJS de l'API utilisée par PetFosterConnect, tout en conservant les mêmes fonctionnalités.

## Présentation

Pet Foster Connect permet de mettre en relation des familles d’accueil pour les animaux avec des associations de protection animale.

PFC permet aux gens de jouer un rôle fondamental en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie.

PFC a pour vocation de répondre à plusieurs besoins :

- Les animaux aimeraient bien un toit, et les gens aiment les animaux (en général)
- Permettre aux associations / refuges de communiquer sur les animaux nécessitant une place au chaud
- Permettre aux familles d'accueil de se faire connaître et de se mettre en relation avec les refuges / associations

## Technologies utilisées

Pour réaliser cette application, nous nous sommes servis de :

|   **Nom**      |     **Utilité**   |
| -------------- | ----------------- |
| TypeScript | Langage |
| NestJS | Framework |
| cors | Protection XSS |
| JSON WebToken | Authentification |
| bCrypt | Chiffrement |
| multer | Upload des images |
| sharp | Transformation des images uploadées |
| PostgreSQL | Base de données |
| sequelize | ORM |
