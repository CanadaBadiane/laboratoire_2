# Projet: Bibliothèque personnelle

## Description du projet et du domaine métier choisi

Ce projet vise à gérer une bibliothèque personnelle. Il te permet de voir ta liste de livres, d'ajouter un nouveau livre, de modifier et de supprimer un livre existant dans ta liste, tout cela dans une interface moderne, agréable et intuitive.

## Instructions d'installation et de configuration

### Étape 1 : Cloner et installer

```bash
git clone [https://github.com/CanadaBadiane/laboratoire_2.git]
cd laboratoire_2
npm install
```

### Étape 2 : Configurer la base de données

1. Créez un compte sur [Neon.tech](https://neon.tech)
2. Créez une nouvelle base de données PostgreSQL
3. Copiez l'URL de connexion fournie par Neon
4. Créez un fichier `.env` à la racine du projet :

```bash
# .env
DATABASE_URL="postgresql://username:password@hostname:5432/database?sslmode=require"
```

PS: Il se peut que votre URL de connexion fournie par Neon finisse par:

`&channel_binding=require`

### Étape 3 : Installer Prisma et générer la base de données

```bash
npm install prisma @prisma/client
npx prisma generate
npx prisma db push
```

### Étape 4 : Démarrer l'application

```bash
npm run dev
```

Ouvrez http://localhost:3000 dans votre navigateur.

## Architecture technique et choix de conception

### Technologies utilisées

- **Next.js 15** (App Router)
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL** (Neon.tech)
- **TailwindCSS** (Framework CSS)

### Prérequis

- Node.js 18+ installé
- Compte gratuit sur [Neon.tech](https://neon.tech)

## Captures d'écran de l'interface utilisateur

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
