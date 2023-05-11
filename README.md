# Learning Javascript

## Objectifs

Apprendre Javascript autour d'un projet d'extraction dans un fichier 
Excel, des données de l'application Genesys Cloud.

Dans un premier temps, on va récupérer une extraction des comptes 
utilisateurs au format JSON puis on va extraire de ce JSON les 
informations pertinentes.
Les informations seront présentées dans une page HTML au format 
CSV ou dans un tableau HTML.

- ID de l'utilisateur,
- Nom complet,
- Prénom,
- Nom,
- Email,
- Poste,
- Département,
- Titre,
- Identifiant,
- Division dont dépend la file d'attente.

Elles seront ensuite copiées et collées dans un fichier Excel pour 
diffusion et exploitation.

Dans un second temps, on récupérera la liste des files d'attente.
Les données pertinentes sont :

- ID de la file d'attente,
- Nom de la file d'attente,
- Le nombre d'agents inscrits dans la file d'attente,
- Le délai après raccroché (ACW),
- Division dont dépend la file d'attente.

Enfin, on récupera la liste des compétences.
Les données pertinentes sont :

- ID de la compétence,
- Nom de la compétence,
- Etat de la compétence (Active/Inactive).

Dans les trois cas de figure, on devra pouvoir filtrer les résultats 
par division lorsque c'est pertinent.

## Pré-requis
- Un accès à Genesys Cloud,
- HTML 5,
- CSS 3,
- JS ES6 ou supérieure.

## Références

- [Pierre Giraud - Apprendre à coder en JavaScript | Cours complet (2020)](https://www.pierre-giraud.com/javascript-apprendre-coder-cours/)
- [NadfriJS](https://www.youtube.com/@NadfriJS)
- [WeFormYou - Javascript](https://www.youtube.com/hashtag/weformyou)
- [Tutorial Javascript W3C](https://www.w3schools.com/js/)
- [Genesys Cloud Developper Center](https://developer.genesys.cloud/)
- [Genesys Cloud fair use policy](https://help.mypurecloud.com/articles/genesys-cloud-fair-use-policy/)
