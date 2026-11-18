# Plan d'itérations — L'BURN (équipe XQNWU2)

**Plan validé le 2026-11-18** (le développeur a lancé `/iteration 1` sans correction du plan).

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation : ni fichier `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`).
- **Temps restant annoncé** : 90 minutes (demandé le 2026-11-18). Redemandé au début de l'itération 1 : ~85 minutes restantes.
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
- **Bilan** : _à remplir en fin d'itération_

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
- **Bilan** : _à remplir en fin d'itération_

---

## À venir (non détaillé, ordre de priorité de l'équipe)

4. Retour en direct dans le fil de conversation avec le coach (👍/👎 sur une suggestion, enregistré) — seulement si le temps restant le permet après l'itération 3 ; sinon signalé comme non fait au pitch.
5. Dernière itération : stabilisation de ce qui sera montré au pitch (pas de nouvelle fonctionnalité).
