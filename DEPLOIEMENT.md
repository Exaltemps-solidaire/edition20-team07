# Déploiement

L'application aide une adhérente de l'association **L'BURN** à retrouver où elle en est dans son
parcours (module, minute de vidéo, étape de quiz) quand elle revient sur la plateforme, pour
avancer à son rythme sans effort mental.

## Services

- **frontend** (exposé au public, port 80 dans le conteneur / 8080 publié) : export statique
  Next.js servi par nginx. Pages : écran « Qui êtes-vous ? » et tableau de bord. Les routes
  `/health` et `/sante` sont des fichiers statiques.
- **api** (port 8081 publié) : service Node minimal. Pour l'instant, sert seulement `/health` et
  `/sante` ; aucune route métier n'est encore branchée.

## Services externes appelés

Aucun pour l'instant. Les personas et les positions (module en cours, minute de vidéo, étape de
quiz) sont des données d'exemple en dur dans le frontend ; rien ne casse si un service externe
tombe, puisqu'aucun n'est encore appelé.

## Ce qui est fragile ou inachevé

- Les données affichées sont en dur et stockées dans le `localStorage` du navigateur (choix du
  persona) : rien n'est encore persisté côté serveur. La reprise réelle (API + stockage) est
  prévue en itération 2.
- Le bouton « Reprendre exactement là où je me suis arrêtée » est pour l'instant un bouton sans
  action : la navigation vers le contenu réel n'est pas encore codée.

## Contact

- Équipe : Équipe 07 (XQNWU2)
- Association : L'BURN (Les BURN'ettes)
