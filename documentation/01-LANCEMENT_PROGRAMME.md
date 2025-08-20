# Lancement du programme

## Les installations

Effectuez cette commande dans cmd:

```bash
npm install
```

## Configuration de la base de données

1. Créez un compte sur [neon.tech](https://neon.tech)
2. Créez une base PostgreSQL en cliquant sur "nouveau projet"
3. Copiez l'URL de connexion
4. Créez `.env` et mettez:

```bash
DATABASE_URL="postgresql://user:pass@host.neon.tech/db?sslmode=require"
```

L'URL peut parfois finir par "&channel_binding=require" mais c'est correct aussi.

## Synchronisation

Effectuez cette commande dans cmd:

```bash
npx prisma generate
npx prisma db push
```

## Démarrage

Effectuez cette commande dans cmd

```bash
npm run dev
```
