# Utilisation des endpoints

## Utilisation de app/api/books/route.ts

### Méthode GET

Cette méthode permet de lister tous les livres se trouvant dans la base de données. Au début la liste sera vide puisqu'aucun ajout d'un livre n'aura été fait.

Pour faire cette requete il faut l'écrire comme suit:

**URL** : `POST http://localhost:3000/api/books`

PS: Il faut s'assurer que le localhost:3000 est disponible.

### Méthode POST

Cette méthode permet d'ajouter un livre dans la base de données.

Pour ajouter un livre, il suffit de remplir les informations demandées telles que:

**Exemple correct:**

**URL** : `POST http://localhost:3000/api/books`
`@contentType = application/json`

```json
{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique",
  "read": false
}
```

**Réponse attendue:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Le Petit Prince",
    "author": "Antoine de Saint-Exupéry",
    "genre": "Conte philosophique",
    "read": false
  },
  "message": "Livre ajouté avec succès!"
}
```

**Exemple non-correct:**

**URL** : `POST http://localhost:3000/api/books`
`@contentType = application/json`

```json
{
  "title": "",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique",
  "read": false
}
```

**Réponse attendue:**

```json
{
  "success": false,
  "error": "Le titre du livre est obligatoire et doit etre une chaine de caractere non vide"
}
```

Il faut donc un titre (string), un auteur (string), un genre (string) et marqué comme lu (true) ou non (false) pour l'ajout d'un livre. Sans cela, il te sera impossible d'ajouter un livre dans la base de données.

PS: Le champ "read" n'est pas obligatoire puisque sa valeur est false par défaut dans la base de données. Ceci étant dit, pour éviter une erreur serveur (500), il faut soit mettre une chaine vide ou null.

**Exemple correct:**

**URL** : `POST http://localhost:3000/api/books`
`@contentType = application/json`

```json
{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique",
  "read": ""
}
```

**Réponse attendue:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Le Petit Prince",
    "author": "Antoine de Saint-Exupéry",
    "genre": "Conte philosophique",
    "read": false
  },
  "message": "Livre ajouté avec succès!"
}
```

**Exemple non-correct:**

**URL** : `POST http://localhost:3000/api/books`
`@contentType = application/json`

```json
{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique",
  "read":
}
```

**Réponse attendue:**

```json
{
  "success": false,
  "error": "Erreur lors de l'ajout du livre"
}
```

## Utilisation de app/api/books/[id]/route.ts

### Méthode PUT

Cette méthode permet de modifier le champ "read" d'un livre existant dans la base de données à true ou false.

Pour modifier un livre il te faudra son ID pour effectuer la requete suivante comme telle:

**Exemple correct:**

**URL** : `PUT http://localhost:3000/api/books/1`
`@contentType = application/json`

```json
{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique",
  "read": true
}
```

**Réponse attendue:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Le Petit Prince",
    "author": "Antoine de Saint-Exupéry",
    "genre": "Conte philosophique",
    "read": true
  },
  "message": "Livre modifié avec succès!"
}
```

Changer une autre information que le "read" ne sera pas pris en compte dans la modification du livre. Seul le champ "read" peut etre modifiable. Il ne peut y avoir aucun impact sur le titre, l'auteur ou meme le genre du livre.

**Exemple correct:**

**URL** : `PUT http://localhost:3000/api/books/1`
`@contentType = application/json`

```json
{
  "title": "Le Petit Prince",
  "author": "",
  "genre": "Conte philosophique",
  "read": true
}
```

**Réponse attendue:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Le Petit Prince",
    "author": "Antoine de Saint-Exupéry",
    "genre": "Conte philosophique",
    "read": true
  },
  "message": "Livre modifié avec succès!"
}
```

Si le champ "read" ne contient absolument rien, cela va créer une erreur. En y mettant tout et n'importe quoi comme un nombre, une chaine vide ou non-vide, ou meme retirer le champs "read", cela occasionnera aucune erreur. Le champs "read" restera tout simplement false, sa valeur par défaut.

**Exemple non-correct:**

**URL** : `PUT http://localhost:3000/api/books/1`
`@contentType = application/json`

```json
{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique",
  "read":
}
```

**Réponse attendue:**

```json
{
  "success": false,
  "error": "Erreur lors de la modification du livre"
}
```

**Exemple correct:**

**URL** : `PUT http://localhost:3000/api/books/1`
`@contentType = application/json`

```json
{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique",
  "read": 44
}
```

**Réponse attendue:**

```json
{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique",
  "read": false
}
```

**Exemple correct:**

**URL** : `PUT http://localhost:3000/api/books/1`
`@contentType = application/json`

```json
{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique"
}
```

**Réponse attendue:**

```json
{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Conte philosophique",
  "read": false
}
```

### Méthode DELETE

Cette méthode te permet de supprimer un livre existant grace à son ID.

Pour effectuer cette requete, il faut l'écrire comme suit:

**Exemple correct:**

**URL** : `DELETE http://localhost:3000/api/books/1`

**Réponse attendue:**

```json
{
  "success": true,
  "message": "Le livre \"Le Petit Prince\" supprimé avec succès"
}
```

Une erreur peut apparaitre si tu essaies de supprimer un livre avec un ID inexistant ou invalide (pas un entier).

**Exemple non-correct:**

**URL** : `DELETE http://localhost:3000/api/books/879`

**Réponse attendue:**

```json
{
  "success": false,
  "error": "Aucun livre avec cet ID n'a été trouvé"
}
```

**Exemple non-correct:**

**URL** : `DELETE http://localhost:3000/api/books/pomme`

**Réponse attendue:**

```json
{
  "success": false,
  "error": "ID du livre invalide"
}
```
