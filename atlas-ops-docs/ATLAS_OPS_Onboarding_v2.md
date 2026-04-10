# Process de Démarrage Client — ATLAS OPS

**DOCUMENT INTERNE — Usage Billal uniquement**
*Version 2.0*

---

## Vue globale J0 → J30

| Étape | Délai | Responsable | Livrable |
|-------|-------|-------------|----------|
| Signature du contrat + 1er règlement | J0 | Client + ATLAS OPS | Contrat signé, facture acquittée |
| Email de bienvenue | J0 (dans l'heure) | ATLAS OPS | Email envoyé au client |
| Réunion de cadrage (kick-off) | J3 max | ATLAS OPS | Fiche de configuration complétée |
| Fourniture des accès par le client | J5 max | Client | Accès reçus et vérifiés |
| Déploiement en environnement de test | J7 | ATLAS OPS | Agent en test, lien de suivi partagé |
| Validation client (3 jours de test) | J10 | Client | Bon de validation signé |
| Mise en production | J12-J14 | ATLAS OPS | Bon de mise en production signé |
| **Moment wow J+7** | J14–J21 | ATLAS OPS | Première relance envoyée avec succès |
| Premier suivi hebdomadaire | J21 | ATLAS OPS | Note de suivi envoyée |
| Bilan J+30 | J30 | ATLAS OPS | Rapport mensuel d'activité |

---

## J0 — Signature et kick-off

### Checklist interne (tutoiement — usage Billal)

- [ ] Contrat signé reçu (PDF signé par les deux parties)
- [ ] Premier règlement reçu (frais de mise en place)
- [ ] Dossier client créé (nom, SIREN, contact désigné, pack souscrit, date de signature)
- [ ] Dossier projet ouvert (espace de travail dédié : configuration, accès, communications)
- [ ] Email de bienvenue envoyé dans l'heure suivant la signature

### Email de bienvenue (à envoyer dans l'heure — vouvoiement)

**Objet** : Bienvenue chez ATLAS OPS — votre agent démarre bientôt

---

Bonjour [Prénom],

Votre contrat est signé. L'aventure commence.

Voici ce qui va se passer dans les prochains jours :

**Dans les 48 heures**, je vous propose une date pour notre réunion de cadrage — environ 45 minutes, chez vous ou en visio. C'est lors de cette réunion qu'on définit précisément ce que votre agent doit faire.

**Dans les 10 à 14 jours**, votre agent sera en production. À partir de là, il commence à travailler.

**À J+7 de la mise en production**, vous recevrez la confirmation de la première relance envoyée avec succès — avec le contexte et le retour obtenu.

Pour préparer notre réunion de cadrage, pourriez-vous avoir à portée de main :
- Le nombre de devis envoyés par mois (approximatif)
- Les coordonnées de votre messagerie professionnelle (ou WhatsApp Business)
- Un exemple de devis ou de proposition que vous envoyez habituellement

D'ici là, n'hésitez pas à me contacter directement pour toute question.

Bienvenue à bord.

Billal
ATLAS OPS — contact@atlasops.fr — atlasops.fr

---

## J3 — Réunion de cadrage (45 min)

### Agenda de la réunion de cadrage

| Durée | Sujet |
|-------|-------|
| 5 min | Présentation du process J0→J30, questions du client |
| 10 min | Définition du périmètre de l'agent (quels devis, quels canaux, quelles conditions de déclenchement) |
| 15 min | Validation des messages types (3 variantes de relance, ton, signature) |
| 10 min | Accès techniques à fournir (checklist client) |
| 5 min | Validation des indicateurs de succès J+30 |

### Checklist accès à fournir par le client

*[À remettre au client lors de la réunion de cadrage ou à envoyer par email le jour même.]*

**Pour l'Agent Atlas Relance :**
- [ ] Accès à la messagerie électronique professionnelle (adresse et mot de passe applicatif ou connexion déléguée)
- [ ] Ou : identifiants WhatsApp Business (numéro de téléphone associé, accès au panneau de gestion)
- [ ] Exemple de devis ou de proposition de mission type (pour calibrer les messages de relance)
- [ ] Liste des contacts actuellement en attente de réponse (facultatif — pour un démarrage avec des données réelles)
- [ ] Coordonnées de l'interlocuteur à alerter en cas d'escalade (dirigeant ou commercial désigné)

**Pour l'Agent Atlas Flow *(si Pack Duo)* :**
- [ ] Accès à la messagerie électronique entrante (même identifiants que ci-dessus)
- [ ] Liste des 20 à 30 questions les plus fréquentes avec les réponses validées (base de connaissance initiale)
- [ ] Règles de tri : quels types de demandes sont urgentes, lesquelles peuvent attendre
- [ ] Coordonnées des interlocuteurs à notifier selon le type de demande (urgence, devis, SAV, etc.)

### Fiche de configuration agent (à compléter pendant la réunion)

| Champ | Valeur |
|-------|--------|
| Nom de l'agent | [ex. : "Relance commerciale — [Nom client]"] |
| Canal principal | [ ] Email [ ] WhatsApp Business [ ] Les deux |
| Délai de déclenchement | [Par défaut : 48h sans réponse] |
| Séquence de relance | J+2 : [message type 1] / J+5 : [message type 2] / J+7 : escalade vers [contact désigné] |
| Signature des messages | [Prénom + Nom, entreprise, numéro de contact] |
| Plages horaires d'envoi | [ex. : Lun–Ven, 8h–18h] |
| Exclusions | [Contacts VIP à ne jamais relancer automatiquement — liste à fournir] |
| Indicateurs de succès J+30 | [ex. : taux de réponse > 30 %, 0 devis > 7 jours sans relance] |

---

## J7 — Déploiement en environnement de test

### Checklist déploiement interne

- [ ] Agent déployé sur l'infrastructure dédiée au client
- [ ] Connexions aux canaux testées et validées
- [ ] Séquence de relance configurée selon la fiche de configuration validée
- [ ] 10 à 20 séquences de test exécutées (sur des contacts fictifs ou des données test)
- [ ] Journal d'activité visible et lisible
- [ ] Tableau de bord d'activité accessible (si pack Standard ou Duo)

### QA — 10 points de vérification avant validation client

| # | Point de contrôle | Validé |
|---|---|---|
| 1 | L'agent déclenche bien une relance après le délai configuré | ☐ |
| 2 | Le message envoyé correspond exactement au message type validé | ☐ |
| 3 | La signature est correcte (nom, entreprise, contact) | ☐ |
| 4 | L'escalade à J+7 notifie bien le bon interlocuteur | ☐ |
| 5 | Aucun contact exclu ne reçoit de message | ☐ |
| 6 | Les plages horaires d'envoi sont respectées | ☐ |
| 7 | Le journal d'activité enregistre chaque action avec horodatage | ☐ |
| 8 | En cas d'erreur de connexion, une alerte est remontée | ☐ |
| 9 | L'agent ne répète pas une relance déjà envoyée | ☐ |
| 10 | La suppression d'un contact de la liste est prise en compte sous 24h | ☐ |

### Communication client — invitation à la période de test

**Objet** : Votre agent est prêt — phase de test (3 jours)

---

Bonjour [Prénom],

Votre agent est configuré et opérationnel en environnement de test.

Pendant 3 jours ouvrés, nous allons le faire fonctionner sur des données de test pour vérifier que tout se passe exactement comme prévu : les messages envoyés, les délais respectés, les alertes correctement transmises.

Si vous souhaitez consulter le journal d'activité en temps réel, voici votre accès : [lien — À COMPLÉTER]

À l'issue de ces 3 jours, je vous soumettrai un bon de validation pour confirmer la mise en production réelle.

N'hésitez pas à me signaler toute anomalie ou remarque sur les messages types.

Billal
ATLAS OPS — contact@atlasops.fr

---

## J14 — Validation client et mise en production

### Bon de validation (à faire signer avant mise en production)

> "Je soussigné(e) [Prénom Nom], représentant(e) de [Nom entreprise], certifie avoir pris connaissance du journal d'activité de l'agent sur la période de test et valide sa mise en production dans le périmètre défini lors de la réunion de cadrage du [date]."
>
> Date : [JJ/MM/AAAA] — Signature :

### Go-live checklist

- [ ] Bon de validation signé reçu
- [ ] Connexions aux canaux réels testées et validées
- [ ] Séquences de relance activées sur données réelles
- [ ] Premier rapport d'activité prévu pour [date J+30]
- [ ] Client informé par email de la mise en production effective
- [ ] Date du premier suivi hebdomadaire (J+21) confirmée

---

## J+7 post-mise en production — "Moment wow"

### Objectif

Créer la première preuve de valeur visible, concrète, mémorable. C'est le moment qui transforme un client signataire en client convaincu.

### Ce qui doit se passer

Dans les 7 jours suivant la mise en production, l'agent envoie sa première relance réelle. Dès que c'est fait, Billal envoie un message WhatsApp ou email au client :

**Message WhatsApp "Moment wow" :**

> "Bonjour [Prénom] ! Bonne nouvelle : votre agent vient d'envoyer sa première relance — pour [désignation du devis ou de la demande]. Tout s'est passé exactement comme prévu. Je vous envoie le détail par email dans 10 minutes."

**Email de confirmation :**

**Objet** : Votre agent a envoyé sa première relance — voici ce qui s'est passé

---

Bonjour [Prénom],

Votre agent est en marche.

Ce matin [ou : hier soir à Xh], il a détecté que votre [devis / proposition] pour [contexte anonymisé si nécessaire] était sans réponse depuis 48 heures. Il a envoyé une relance personnalisée selon le message type que vous avez validé.

Voici le détail de l'action :

- **Déclencheur** : devis envoyé le [date], sans réponse à J+2
- **Action** : envoi de la relance type 1 le [date] à [heure]
- **Destinataire** : [nom / référence]
- **Statut** : envoyé avec succès

C'est exactement ce que l'agent est censé faire. Ça se passe maintenant, pendant que vous êtes sur autre chose.

Le rapport mensuel complet sera disponible à J+30.

Billal
ATLAS OPS — contact@atlasops.fr

---

## J21 — Premier suivi hebdomadaire

### Agenda du suivi (30 min — visio ou téléphone)

| Durée | Sujet |
|-------|-------|
| 5 min | Tour de table rapide — ressenti client, questions |
| 10 min | Revue du journal d'activité depuis la mise en production |
| 5 min | Résultats préliminaires (relances envoyées, taux de réponse, escalades) |
| 5 min | Ajustements éventuels (ton des messages, plages horaires, exclusions) |
| 5 min | Anticipation du bilan J+30 et des indicateurs attendus |

---

## J30 — Bilan du premier mois

### Rapport mensuel

Envoyer le rapport mensuel selon le template `ATLAS_OPS_Reporting_Mensuel.md`, complété avec les données réelles du mois.

### Satisfaction client

À la fin du rapport ou lors d'un appel dédié, poser deux questions :

1. *"Sur une échelle de 1 à 10, à combien évaluez-vous la valeur que l'agent vous a apportée ce mois ?"*
2. *"Y a-t-il une tâche supplémentaire que vous aimeriez que l'agent prenne en charge ?"*

*[La question 2 ouvre naturellement la conversation sur une montée en gamme vers le pack supérieur ou l'ajout d'Atlas Flow.]*

---

## Brief freelance (template)

*[À utiliser quand un prestataire technique freelance intervient pour la mise en place ou la maintenance.]*

**Objet de la mission :** déploiement et configuration de l'agent IA métier pour le client [Nom client]
**Durée estimée :** [X jours]
**Rémunération :** [montant] € HT

**Ce que tu dois faire :**
- [Tâche 1 — ex. : configurer la connexion à la messagerie du client]
- [Tâche 2 — ex. : déployer le service sur le VPS dédié]
- [Tâche 3 — ex. : effectuer les 10 tests de la QA checklist]

**Ce que tu ne dois pas faire :**
- Accéder à d'autres données que celles strictement nécessaires à ta mission
- Conserver des accès après la fin de la mission
- Communiquer les accès reçus à des tiers

**Confidentialité :** tu signes un accord de confidentialité avant le début de la mission. Tes accès sont révoqués dans les 24h suivant la fin de la mission.

**Livrable attendu :** rapport de déploiement (2 pages max) + confirmation de la QA checklist + attestation de suppression de tes accès locaux.

---

*ATLAS OPS — Document interne — Ne pas diffuser — contact@atlasops.fr*
