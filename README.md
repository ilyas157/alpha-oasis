# Alpha Oasis — Site d'agence de voyage (MERN)

Application web full-stack pour une agence de voyage, réalisée pendant mon stage chez **MoroccoW3** (SSII, Meknès) à l'été 2025.

**Fonctionnalités :** catalogue de voyages, destinations, hôtels et hébergements ; réservations ; authentification (bcrypt) avec rôle administrateur et tableau de bord ; messages de contact et témoignages ; validation des données (Joi).

**Stack :** MongoDB · Express · React (Vite, React Router, Tailwind CSS) · Node.js

## Lancement

1. **Installer les dépendances**
```
   npm install
   cd client/my-app && npm install
   cd ../../server && npm install
```

2. **Configurer l'environnement** : créer `server/.env` avec `PORT`, `JWT_SECRET` et `MONGO_URI`. Des données d'exemple sont disponibles dans `database/` (script `server/seed.js`).

3. **Lancer le backend**
```
   cd server
   node server.js
```

4. **Lancer le frontend**
```
   cd client/my-app
   npm run dev
```
