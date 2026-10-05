je veux creer un admin de gestion de tresorerie,, comme je suis devenu responsable d'argent dans societe actuel (plutot coti cota entre employeur ),,, je voudrai creer un systeme plutot que d'utiliser excel.

Avant de choisir l'outil et techno,, le but c'est de pouvoir gerer les argent entrant et sortie avec flexibilite de categorie, par exemple il est possible d'ajouter de nouveau categorie, et flexiblite d'autre fonctionnalite qui peuvent etre variable,,, je ne sais pas comment fonctionne cet excel actuel, mais voici l'excel utiliser. Bien comprende le fonctionnalite a implementer. Puis on va chercher les outil legere et gratuit jusq au deploiement et base de donnee gratuit et adapter aux projet.

Supprimer, why
https://chatgpt.com/g/g-p-6a548a2f486c8191bd0b8818e28776c6-modestee/c/6aba1ffd-69dc-83ec-8460-91d536ab3e29

https://chatgpt.com/g/g-p-6a548a2f486c8191bd0b8818e28776c6/shared/c/6aba1ffd-69dc-83ec-8460-91d536ab3e29

https://chatgpt.com/g/g-p-6a548a2f486c8191bd0b8818e28776c6/shared/c/6ab11ef0-28e0-83ea-ab7e-d48b095ee0fd?owner_user_id=user-YUsPKMhCfXPipUHYyRs802x4

Il faut se mettre d'accord sur ce qu'on veut faire avant la realisation ok ?

Deja c'est tres bien les modules,,, c'est vraiment la base de tous ce qu'on va faire. 

Juste pour preciser il faut que on implement les bonne maniere comme par exemple, pour les tableaux il faut mettre filtre global, posibilite ajout filtre sur un champ ex: si date, on peut filtrer par intervalle le tableaux, il faut mettre pagination sur les table,, mettre triage sur les champs.

pour le moment l'user est seulement moi, mais il faut toujours considerer la possibilite d'extension de fonctionnalite par exemple, les personnes peuvent faire consultation direct, donc user avec role lecteur par exemple,, dans fonctionnalite futur.

Pour le moment on a une caisse.

On devait avoir la possibilite de faire ajout Entree specifique a 1 ou plusieurs personnes en meme temps en une seul entree pour ceux avec le meme montant, possibilite de choix en: date, mois/annee, intervalle date, intervalle mois, plusieurs selection de date, plusieurs selection de mois.

Possibilite de faire sortie avec meme principe de possiblite de choix en different type de date. pour les prets, je pense c'est toujours de type sortie mais il faut juste ajouter possibilite de faire parametre d'ajout de user concernee et cateogrie de sortie.

pour les modifications, on ne peut que faire modification en une seule par exemple une seule entree seulement, meme si ca a ete inserer parmis plusieurs en meme temps,, car le stockage est toujours le meme avec un seul entree ou sortie mais c'est pour faciliter l'insertion qu'on effectue cet fonctionnalite d'ajout en plusieurs. 

Pour suppression, on peut selectionner plusieurs sur liste de transaction, avec possibilite de suppression en plusieurs. Mais pour la suppression, on ne vas pas faire vraiment suppression mais plutot marquer supprimer ou miger vers un table de suppresion.

Pour les crud, il faut toujours avoir tracage de qui a effectuer ajout, quand, qui a modifier, quand, qui a supprimer, quand.

- Concernant les categories entree et sortie: ex: cotisation, emprunt, rembourssement, possibilite ajout cateogire appartenant a entree ou sortie ou les 2. CRUD de categorie.

- Concernant cotisation, c'est a partir de la date d'entree de chacun que commence le debut de la cotisation.

- on devrait avoir parametre globale de prix de cotisation et la frequence, mais a mettre dans membre quand meme les paramettres prix et frequence,,, au cas ou dans le futur des que chacun a son propre prix de cotisation dont cela peut etre dependre de groupe a qui le membre appartiennent.

- Tableau de bord,, 
il y a tableau de bord globale, contenant:
- Fond actuel
Flitre: mois : avec par defaut le mois actuel / possibilite de filter par ans (par defaut) / possibilite de filter par intertalle de date ou de mois
entree et sortie (filtrable par le filtre)

- graphe(s) de comparaison entre sortie et enree (pour convaincre qu'il faut payer)
un ou plusieurs graphe pour faire cela,, filtrer par le filtre en haut
- ex: graphe ligne par mois
    - graphes par categorie, categorie d'entree et categorie de sortie (ex: fromage) / filtrer par le filtre en haut

- Liste membre avec cotisdation imcomplet avec lien vers tableu de bord d'une membre.

- Le tableau de bord d'une membre:
Etat cotisation,, chiffre au debut 

- historique complet entree et sortie avec pret et rembourssement

- Tableau dynamique ou il y a tous les mois triee du plus recent au plus ancien, champs mois/annee et prix montant de l'annee, il faut mettre tous les mois meme si c'est vide 0 on mets en rouge avec colonne status impayer,, il sepeut aussi que le membre a payer dans le futur ,,ex : jusqu au novembre, alors il faut montrer tous ce qu'il a payer jusqu'aux mois dernier qu'il a payer


concernant le style,,, nous allons plutot de baser sur style admin,, on n'est pas obliger d'utiliser des elements complese,,, on peut utiliser des library qui fournis bon element de design,,, mais on n'est pas obliger,,, on peut faire du css ou .module.css,, le but c'est de faciliter cote style.

Extensions recommandées :
React / JavaScript
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier
Node / Backend
- Prisma
- Thunder Client (pour tester les API)
Base de données
- PostgreSQL
- SQLTools
Git
- GitLens

git init

npm create vite@latest front

npm install --save-dev nodemon

npm install dotenv express 
npm install pg cors

npm init -y