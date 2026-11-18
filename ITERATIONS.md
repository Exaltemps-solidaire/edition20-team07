# Plan d'itérations — L'BURN (équipe XQNWU2)

**Plan validé le 2026-11-18** (le développeur a lancé `/iteration 1` sans correction du plan).

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation : ni fichier `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`).
- **Temps restant annoncé** : 90 minutes (demandé le 2026-11-18). Redemandé au début de l'itération 1 : ~85 minutes restantes. Redemandé au début de l'itération 2 : 70 minutes restantes. Redemandé au début de l'itération 3 : 60 minutes restantes.
- **Durée du tour de test PM Lab** : 10 minutes (valeur par défaut, le développeur ne savait pas).
- **Capacité estimée** : une itération coûte au moins (codage ≤10 min) + ~5 min de publication + 10 min de tour de test, soit 15 à 25 min. Sur 90 minutes, ~3 itérations complètes tiennent confortablement ; une 4e ne tient que si les précédentes vont plus vite que prévu.
- **Hors périmètre** (repris du PRD, `passation/PASSATION.md`) : connexion/création de compte, paiement/adhésion, back-office, parcours ACTIV' et Sentinelle, recommandation BBA vs BIB, notifications push/email, gestion des ateliers socles.
- ✂️ **Risque de périmètre** : le plan de l'équipe (reprise → question/suggestion → retour en direct) est ambitieux pour 90 minutes avec un dialogue de coach crédible. Je découpe la question/suggestion en logique simple à base de règles (pas d'appel LLM) pour tenir le budget ; si ça passe plus vite que prévu, le retour en direct (item 3 du plan de l'équipe) devient l'itération 4, sinon il sort du périmètre et se signale au pitch comme non fait.

---

## Itération 1 : On choisit qui on est et on voit son tableau de bord avec sa reprise mémorisée

- **Dans le périmètre** :
  - `.env.example` et `DEPLOIEMENT.md` à la racine (contrat de déployabilité).
  - Écran « Qui êtes-vous ? » : liste de personas (ex. Julie, BURN'ette en reconstruction / une 2e en remobilisation), bouton pour changer de persona à tout moment.
  - Tableau de bord : affiche le stade (1-5), la thématique, le module en cours, la minute de vidéo et l'étape de quiz mémorisées — données en dur pour cette itération, un jeu par persona.
- **Hors périmètre** : mémorisation réelle d'une position (vient en itération 2), dialogue avec le coach, retours.
- **Critères d'acceptation** :
  - Étant donné l'application démarrée, quand j'arrive sur `/`, alors je vois l'écran « Qui êtes-vous ? » avec au moins deux personas.
  - Étant donné un persona choisi, quand j'arrive sur le tableau de bord, alors je vois le module en cours, la minute de vidéo et l'étape de quiz de ce persona (données d'exemple), et un bouton pour changer de persona.
  - Étant donné l'application déployée, quand j'appelle `/health` et `/sante` sur 8080 (et 8081 pour l'API), alors ils répondent 200.
- **Hypothèse de l'équipe couverte** : aucune pour de vrai — pose la base visuelle de l'hypothèse « zéro étape de navigation pour retrouver sa position », qui sera vérifiée à l'itération 2 quand la donnée sera réelle.
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : `.env.example`, `DEPLOIEMENT.md`, `frontend/src/app/page.tsx` (écran personas), une page tableau de bord (route à créer selon convention Next de ce gabarit), un petit fichier de données d'exemple partagé par les deux pages.
- **Tests unitaires prévus** : 1 à 2, sur la fonction qui sélectionne les données d'un persona (pas sur le balisage).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouvrir l'app, choisir un persona, vérifier que le tableau de bord affiche son module en cours.
- **Bilan** :
  - Durée de codage réelle : 3 minutes (pas de dépassement).
  - Critères d'acceptation : les 3 satisfaits (vérifiés par `curl` sur 8080/8081 et par la démo Playwright locale).
  - Reporté : rien pour cette itération ; la mémorisation réelle de la position (au-delà des données en dur) reste l'objet de l'itération 2, comme prévu.
  - Le harnais a refusé le premier appel à `scripts/signaler-version.sh 1` : `npm test` échouait car les dépendances npm n'étaient pas encore installées à la racine du dépôt (premier codage sur cette machine). Corrigé par `npm install` à la racine et dans `frontend/`, puis signal accepté.
  - Déployé sur la plateforme locale (`podman compose`), `localhost:8080` et `localhost:8081` répondent ; vérification de `$URL_PUBLIQUE` demandée au développeur, sans bloquer le signal.
  - **Modifications** :
    - `.env.example` : créé, liste `PORT` (seule variable lue par l'api à ce stade).
    - `DEPLOIEMENT.md` : créé, décrit les deux services et ce qui est encore en dur.
    - `frontend/src/lib/personas.ts` : données d'exemple (2 personas) et `getPersonaById`, logique testable.
    - `frontend/src/lib/personas.test.ts` : 3 tests unitaires sur `getPersonaById`.
    - `frontend/src/app/page.tsx` + `page.module.css` : écran « Qui êtes-vous ? », remplace le gabarit par défaut de Next — sert le critère 1.
    - `frontend/src/app/tableau-de-bord/page.tsx` + `page.module.css` : nouvelle page, affiche stade, thématique et position mémorisée du persona choisi — sert le critère 2.
    - `frontend/src/app/layout.tsx` : titre et description mis à jour.
    - `api/Dockerfile`, `frontend/Dockerfile` : image de base qualifiée en `docker.io/library/...` (résolution de nom court échouait hors terminal interactif).
    - `podman-compose.yml` : créé à la racine, deux services sur 8080/8081.
    - `e2e/demo.spec.ts` : deux étapes ajoutées (choix du persona, tableau de bord) — sert le critère 2.

---

## Itération 2 : La reprise est vraie — elle survit à un changement de persona et à un rechargement

- **Dans le périmètre** : stocker la position (module, minute vidéo, étape quiz) par persona côté API (en mémoire ou fichier, pas de vraie base de données imposée à ce stade), le tableau de bord la lit via l'API au lieu de données en dur côté front ; un clic « Reprendre » simule l'avancée (ex. incrémente la minute ou l'étape) et la nouvelle position est relue après rechargement.
- **Hors périmètre** : dialogue coach, question d'état, retours.
- **Critères d'acceptation** :
  - Étant donné un persona avec une position mémorisée, quand je clique « Reprendre », alors la position affichée change et reste après un rechargement de page.
  - Étant donné deux personas différents, quand je passe de l'un à l'autre, alors chacun garde sa propre position.
  - Étant donné l'API appelée directement, quand je demande la position d'un persona, alors je reçois le module, la minute et l'étape en JSON.
- **Hypothèse de l'équipe couverte** : « l'agent peut mémoriser la position exacte pour qu'elle reprenne sans effort mental » — vérifiable : zéro étape de navigation pour retrouver sa position après reprise.
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : `api/src/routes.ts` (route `/api/v1/positions/:persona`), un petit stockage en mémoire côté API, le tableau de bord front (appel `fetch` relatif).
- **Tests unitaires prévus** : 1 à 2, sur la logique de lecture/écriture de la position (règle métier, pas le serveur HTTP).
- **Étapes ajoutées à la démo** : cliquer « Reprendre », recharger la page, vérifier que la position a changé et persiste.
- **Bilan** :
  - Durée de codage réelle : 3 minutes (pas de dépassement).
  - Critères d'acceptation : les 3 satisfaits — vérifiés directement sur `localhost:8081` (`GET /api/v1/positions/julie` renvoie le JSON module/minute/étape ; `POST` avance la minute et persiste : relu identique juste après ; `amel` garde sa propre position, indépendante de `julie`).
  - ⚠️ Limite constatée en vérifiant localement : `nginx.conf` ne proxie pas `/api/` (son commentaire le dit explicitement, c'est le rôle du proxy d'entrée) et celui-ci n'existe que sur l'URL publique, injoignable depuis la VM. Le flux complet navigateur → `/api/v1/positions/...` via le port 8080 ne peut donc pas être vérifié depuis la machine ; seule la logique API elle-même (port 8081 direct) l'a été ici. Demandé au développeur de vérifier dans son navigateur, sur `$URL_PUBLIQUE`, que cliquer « Reprendre » change la position affichée et qu'elle reste après un rechargement.
  - Reporté : rien de nouveau pour cette itération.
  - Le harnais n'a rien bloqué cette fois : `npm test` (7 tests) et `./scripts/verifier-deployabilite.sh` passaient dès le premier essai.
  - Déployé sur la plateforme locale (nouvelles images `api`/`frontend` construites, publiées, `podman compose up -d --force-recreate`) ; `localhost:8080` et `localhost:8081/health` répondent 200. Version 2 signalée à PM Lab.
  - **Modifications** :
    - `api/src/positions.ts` : créé — stockage en mémoire des positions par persona, `lirePosition`, `avancerPosition`, et `progresser` (logique pure, testée) — sert les 3 critères.
    - `api/src/positions.test.ts` : créé — 3 tests unitaires sur `progresser`, la persistance après avancée, et le cas persona inconnu.
    - `api/src/routes.ts` : ajoute les routes `GET`/`POST /api/v1/positions/:persona`, en plus de `/health` et `/sante` — sert les 3 critères.
    - `frontend/src/lib/personas.ts` : retire le champ `position` (en dur) des personas ; la position n'a plus qu'une source de vérité, l'API — sert les critères 1 et 2.
    - `frontend/src/lib/personas.test.ts` : retire le test devenu obsolète sur `persona.position`.
    - `frontend/src/app/tableau-de-bord/page.tsx` : lit la position via `fetch` au chargement, le bouton « Reprendre » fait un `POST` et met à jour l'affichage avec la réponse — sert les 3 critères.
    - `e2e/demo.spec.ts` : deux étapes ajoutées (clic « Reprendre », rechargement) — non rejouées localement pour la raison ci-dessus (⚠️), seulement vérifiables sur `$URL_PUBLIQUE`.

---

## Itération 3 : Le coach pose une question et suggère un contenu adapté

- **Dans le périmètre** : écran de dialogue (Écran 2) : le coach pose une question courte sur l'état du moment (choix parmi quelques réponses, pas de texte libre à cette itération pour tenir le budget), et propose un contenu adapté par une règle simple (ex. état difficile → pause ou atelier socle ; état correct → vidéo du module en cours). Accès au dialogue depuis le tableau de bord.
- **Hors périmètre** : retour en direct (👍/👎) sur une suggestion, génération par un vrai modèle de langage (règles fixes pour cette itération).
- **Critères d'acceptation** :
  - Étant donné le tableau de bord affiché, quand je clique pour parler au coach, alors j'arrive sur l'écran de dialogue avec une question sur mon état.
  - Étant donné une réponse choisie, quand je valide, alors le coach propose un contenu cohérent avec cette réponse (pas un diagnostic, une orientation).
  - Étant donné une suggestion affichée, quand je clique dessus, alors je reviens au tableau de bord sur le contenu suggéré.
- **Hypothèse de l'équipe couverte** : « la BURN'ette accède au contenu suggéré sans passer par le catalogue » (plan de l'équipe, point 2).
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : nouvelle page de dialogue côté front, une fonction de règle de suggestion (testable), un lien depuis le tableau de bord.
- **Tests unitaires prévus** : 2 à 3, sur la fonction de règle de suggestion (un cas par état proposé).
- **Étapes ajoutées à la démo** : depuis le tableau de bord, ouvrir le dialogue, répondre à la question, suivre la suggestion.
- **Bilan** :
  - Durée de codage réelle : 2 minutes (pas de dépassement).
  - Critères d'acceptation : les 3 satisfaits — vérifiés par lecture du code et par build (route `/coach` générée, liens fonctionnels) ; la partie purement front (question → suggestion → retour) est indépendante de l'API, donc vérifiable localement sur `localhost:8080/coach`, contrairement au flux de reprise de l'itération 2.
  - Reporté : rien de nouveau.
  - Le harnais n'a rien bloqué : `npm test` (10 tests) et `./scripts/verifier-deployabilite.sh` passaient du premier coup.
  - Déployé : seule l'image frontend a changé (l'API n'a pas bougé), reconstruite, publiée, conteneur recréé ; `localhost:8080/` et `/coach` répondent 200, `localhost:8081/health` toujours 200. Version 3 signalée à PM Lab.
  - **Modifications** :
    - `frontend/src/lib/coach.ts` : créé — `suggerer(etat)`, règle fixe à 3 cas (pas d'appel LLM) — sert le critère 2.
    - `frontend/src/lib/coach.test.ts` : créé — 3 tests, un par état.
    - `frontend/src/app/coach/page.tsx` + `page.module.css` : créés — écran de dialogue (question puis suggestion), le clic sur « Suivre » écrit la suggestion dans `sessionStorage` et revient au tableau de bord — sert les critères 1 et 3.
    - `frontend/src/app/tableau-de-bord/page.tsx` + `page.module.css` : ajoute le bouton « Parler au coach » et une bannière « Suggestion du coach suivie » lue depuis `sessionStorage` — sert les critères 1 et 3.
    - `e2e/demo.spec.ts` : deux étapes ajoutées (parler au coach, suivre la suggestion) — rejouables localement, contrairement aux étapes de reprise (itération 2) qui dépendent de l'API non proxée en local.

---

## Itération 4 : identité visuelle minimale (logo, signature, touche de vert doux)

Redemandé au début de l'itération 4 : 30 minutes restantes. À ce stade, `amelioration.md` est apparu (demande du développeur hors passation initiale, périmètre large : historique de conversation, refonte graphique complète, navigation latérale, parcours conversationnel du coach en plusieurs étapes). Le calcul de capacité (codage + ~5 min de publication + tour de test de l'équipe) ne permettait plus qu'**une seule itération** avant la fin du build. Conformément à la règle de la dernière itération (section 3 de `CLAUDE.md`), tout `amelioration.md` a été reporté après le hackathon (⚠️, décision à faire valider par les cadreurs), de même que le reste du backlog ci-dessous. Le développeur a choisi une itération cosmétique à risque nul plutôt qu'une stabilisation pure.

- **Dans le périmètre** : reprendre un fragment de l'identité graphique demandée dans `amelioration.md` (point 2) sans toucher à la structure des écrans : logo texte « Femmes En Équilibre », signature « Soutenir · Accompagner · Rebondir », une touche d'accent vert doux (`--vert-doux`), affichés en pied de page sur tout l'écran via le layout racine.
- **Hors périmètre** : tout le reste d'`amelioration.md` (historique de conversation, menu latéral, parcours conversationnel à étapes, cartes de modules enrichies, résumé de fin de session) ; refonte de la palette violet/lavande des écrans existants ; thème sombre ; retour en direct ; catalogue de modules (itération reportée, voir « À venir »).
- **Critères d'acceptation** :
  - Étant donné n'importe quel écran de l'application, quand il s'affiche, alors le pied de page montre le logo « Femmes En Équilibre » et la signature.
  - Étant donné le pied de page, quand il s'affiche, alors une touche de vert doux y est visible (bordure/texte), sans régression visuelle sur le reste de l'écran.
  - Étant donné la suite de tests existante, quand `npm test` tourne, alors les 10 tests passent toujours (changement purement cosmétique, aucune logique touchée).
- **Hypothèse de l'équipe couverte** : aucune (demande du développeur, hors plan initial) ; fragment choisi d'`amelioration.md` point 2.
- **Codage estimé** : 5 minutes
- **Fichiers prévus** : `frontend/src/app/layout.tsx`, `frontend/src/app/layout.module.css` (nouveau), `frontend/src/app/globals.css`.
- **Tests unitaires prévus** : aucun (changement cosmétique, pas de logique métier) ; `npm test` rejoué pour confirmer l'absence de régression.
- **Étapes ajoutées à la démo** : aucune (visuel seul, pas une étape du scénario).
- **Bilan** :
  - Durée de codage réelle : 4 minutes (pas de dépassement, sous le budget estimé).
  - Critères d'acceptation : les 3 satisfaits — vérifiés par `curl localhost:8080/` (logo et signature présents dans le HTML rendu) et par `npm test` (10 tests toujours au vert).
  - Reporté : tout `amelioration.md` sauf ce fragment, et tout le reste du backlog (voir « À venir ») — décision de dernière minute (30 min restantes), ⚠️ à faire valider par les cadreurs après le hackathon.
  - Le harnais n'a rien bloqué : `./scripts/verifier-deployabilite.sh` ne signalait aucune borne, `npm test` passait du premier coup.
  - Déployé : seule l'image frontend a changé (l'API n'a pas bougé), reconstruite, publiée, conteneur recréé ; `localhost:8080/` répond 200 avec le nouveau pied de page, `localhost:8081/health` toujours 200. Version 4 signalée à PM Lab.
  - **Modifications** :
    - `frontend/src/app/layout.module.css` : créé — styles du pied de page (`.piedDePage`, `.logo`, `.signature`) — sert les critères 1 et 2.
    - `frontend/src/app/globals.css` : ajoute le jeton `--vert-doux` à `:root` — sert le critère 2.
    - `frontend/src/app/layout.tsx` : ajoute le pied de page (logo + signature) dans le layout racine, visible sur tout écran — sert le critère 1.
  - **Correction après signal de la version 4** : demande du développeur de remplacer le texte du logo « Femmes En Équilibre » par « L'BURN » partout dans le code (`layout.tsx`, commentaire de `globals.css`). ❗️Signalé : la passation distingue le nom de l'association (L'BURN) de celui du produit affiché dans la maquette d'origine (Femmes En Équilibre) ; le développeur a confirmé vouloir L'BURN partout malgré cet écart avec la passation. Aucune logique touchée, redéployé en version 5.

---

## À venir (non détaillé, ordre de priorité de l'équipe)

5. Catalogue de modules fictifs alimentant le tableau de bord et les suggestions du coach — détaillé une première fois comme « itération 4 » avant l'arrivée d'`amelioration.md` et le recalcul de capacité à 30 minutes restantes ; non codé, reporté après le hackathon avec le reste.
6. Prise en charge du thème sombre des navigateurs — reporté de l'itération 2.
7. Retour en direct dans le fil de conversation avec le coach (👍/👎 sur une suggestion, enregistré) — reporté.
8. `amelioration.md` dans son ensemble (historique de conversation, identité graphique complète, navigation latérale avec « Mon réseau »/« Mes rendez-vous » fonctionnels, parcours conversationnel du coach en 4 étapes avec échelle de burn-out, cartes de modules enrichies, résumé de fin de session) — repéré pendant le hackathon, trop large pour le temps restant ; à soumettre aux cadreurs comme périmètre de suite.
9. Dernière itération avant le pitch : stabilisation de ce qui est montré (pas de nouvelle fonctionnalité) — à faire si du temps subsiste après l'itération 4 ci-dessus ; sinon, l'itération 4 (cosmétique) est la dernière de ce hackathon.
