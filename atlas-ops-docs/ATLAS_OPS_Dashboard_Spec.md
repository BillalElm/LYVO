# Spécification Fonctionnelle — Tableau de Bord Client ATLAS OPS

**DOCUMENT INTERNE — Usage Billal uniquement**
*Version 1.0*

---

## Contexte et objectifs

### Pourquoi ce tableau de bord

Aujourd'hui, la communication des résultats aux clients se fait exclusivement par email (rapport mensuel). Ce mode de fonctionnement est suffisant en phase de démarrage, mais il présente deux limites :

1. Le client n'a pas de visibilité en continu sur l'activité de l'agent — il doit attendre le rapport mensuel.
2. Pour Billal, le suivi de plusieurs clients simultanément sans tableau de bord centralisé devient difficile à partir de 5–6 clients actifs.

Le tableau de bord répond à ces deux besoins.

### Utilisateurs primaires

| Utilisateur | Rôle | Besoins principaux |
|---|---|---|
| **Billal (ATLAS OPS)** | Administrateur | Surveiller l'activité de tous les agents, détecter les anomalies, accéder aux journaux techniques |
| **Client** | Lecteur | Consulter l'activité de son agent, lire les rapports mensuels, vérifier les indicateurs clés |

### Hors périmètre (v1)

- Modification de la configuration de l'agent par le client (lecture seule)
- Notifications push sur mobile (v2)
- Export des données brutes (v2)
- Comparaison multi-clients (réservé à Billal en vue Admin)

---

## Principes de conception

1. **Simple avant complet** : un indicateur compris vaut mieux que dix indicateurs ignorés.
2. **Une vue par agent** : ne jamais mélanger les données Atlas Relance et Atlas Flow sur le même écran.
3. **Données visibles dans les 24 heures** : pas de temps réel strict — une mise à jour quotidienne est suffisante en v1.
4. **Aucun jargon technique dans l'interface** : pas de "logs", "tokens", "webhooks", "API". Utiliser "journal d'activité", "identifiant sécurisé", "connexion de données".
5. **Responsive** : desktop en priorité, lisible sur mobile sans fonctionnalité dégradée critique.

---

## Vue 1 — Tableau de bord principal (accueil)

### Description

Page d'accueil après connexion. Donne une vue d'ensemble de l'activité en cours.

### Maquette filaire

```
┌─────────────────────────────────────────────────────────────────┐
│  ATLAS OPS                                    [Déconnexion]     │
│  Bonjour, [Prénom]                                              │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│  Agents      │  Actions ce  │  Taux de     │  Alertes en        │
│  actifs      │  mois        │  réponse     │  attente           │
│              │              │              │                    │
│     [XX]     │    [XXX]     │   [XX] %     │      [XX]          │
│              │              │              │                    │
│  ● En ligne  │              │ ▲ vs mois -1 │ ⚠ À traiter        │
├──────────────┴──────────────┴──────────────┴────────────────────┤
│  Activité des 30 derniers jours                                 │
│                                                                  │
│  [Graphique barres — 1 barre par jour — volume d'actions]       │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  Mes clients (vue Admin uniquement)                             │
│                                                                  │
│  Nom client      Pack        Statut agent    Dernier rapport    │
│  ──────────      ────        ────────────    ───────────────    │
│  [Client A]      Standard    🟢 En ligne     [Date]             │
│  [Client B]      Pilote      🟢 En ligne     [Date]             │
│  [Client C]      Duo         🟡 Mise à jour  [Date]             │
└─────────────────────────────────────────────────────────────────┘
```

### Métriques affichées en temps réel (mise à jour toutes les 24h)

| Métrique | Description | Source |
|---|---|---|
| Agents actifs | Nombre d'agents en production et en ligne | Journal de statut des agents |
| Actions ce mois | Nombre total d'actions exécutées par l'agent depuis le 1er du mois | Journal d'activité |
| Taux de réponse global | Ratio réponses / relances envoyées ce mois | Journal d'activité |
| Alertes en attente | Nombre d'escalades transmises au client, sans confirmation de prise en charge | Journal d'escalades |

### Logique des alertes

Une alerte est créée automatiquement lorsque :
- Un agent est inactif depuis plus de 2 heures pendant les plages horaires configurées.
- Une escalade J+7 a été transmise au client il y a plus de 24 heures sans réponse.
- La connexion au canal de communication du client est interrompue.

Les alertes sont affichées en haut de la page d'accueil avec le niveau de priorité (rouge = action immédiate, orange = à surveiller).

---

## Vue 2 — Détail agent : Atlas Relance

### Description

Vue dédiée à l'activité de l'agent Atlas Relance pour un client donné.

### Maquette filaire

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Retour  │  Agent Atlas Relance — [Nom client]               │
│             │  Période : [Mois en cours ▼]                      │
├─────────────────────────────────────────────────────────────────┤
│  ENTONNOIR DE RELANCE                                           │
│                                                                  │
│  [XX] Devis identifiés                                          │
│     ↓                                                            │
│  [XX] Relances envoyées (J+2)         ████████████░░  [XX] %   │
│     ↓                                                            │
│  [XX] Relances de 2e niveau (J+5)     ███████░░░░░░░  [XX] %   │
│     ↓                                                            │
│  [XX] Escalades dirigeant (J+7)       ██░░░░░░░░░░░░  [XX] %   │
│     ↓                                                            │
│  [XX] Réponses obtenues               ██████░░░░░░░░  [XX] %   │
├─────────────────────────────────────────────────────────────────┤
│  Journal des relances                          [Filtrer ▼]      │
│                                                                  │
│  Date         Contact           Statut         Action           │
│  ──────────   ───────────────   ──────────     ──────────────  │
│  [JJ/MM Xh]  [Prénom Nom]      ✅ Répondu      Relance J+2     │
│  [JJ/MM Xh]  [Prénom Nom]      ⏳ En attente   Relance J+5     │
│  [JJ/MM Xh]  [Prénom Nom]      ⚠ Escaladé     Alerte J+7      │
│  [JJ/MM Xh]  [Prénom Nom]      ✅ Répondu      Relance J+2     │
│                                                                  │
│  [Charger plus]                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Filtres disponibles

- Période : mois en cours, mois précédent, 3 derniers mois, personnalisé (calendrier)
- Statut : Tous / Répondu / En attente / Escaladé
- Canal : Email / WhatsApp / Tous

---

## Vue 3 — Détail agent : Atlas Flow

*(Disponible uniquement pour les clients Pack Duo)*

### Description

Vue dédiée à l'activité de l'agent Atlas Flow.

### Maquette filaire

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Retour  │  Agent Atlas Flow — [Nom client]                  │
│             │  Période : [Mois en cours ▼]                      │
├──────────────────────────────┬──────────────────────────────────┤
│  Demandes reçues ce mois     │  Délai médian de traitement      │
│                              │                                  │
│         [XXX]                │         [XX] min                 │
│                              │                                  │
├──────────────────────────────┴──────────────────────────────────┤
│  Volume par jour                                                 │
│                                                                  │
│  [Graphique courbe — 1 point par jour — volume de demandes]     │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  Journal des demandes                          [Filtrer ▼]      │
│                                                                  │
│  Date         Type             Statut         Délai             │
│  ──────────   ─────────────    ──────────     ──────           │
│  [JJ/MM Xh]  Demande devis    ✅ Traité        2 min            │
│  [JJ/MM Xh]  Question SAV     ✅ Traité        < 1 min          │
│  [JJ/MM Xh]  Urgence          ⚠ Escaladé      Immédiat         │
│  [JJ/MM Xh]  Demande devis    ⏳ En attente    —                │
│                                                                  │
│  [Charger plus]                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Types de demandes suivis

| Type | Description |
|---|---|
| Demande de devis | Prospect souhaitant recevoir une proposition |
| Question SAV | Client posant une question sur une prestation en cours |
| Urgence | Demande marquée comme urgente selon les règles de tri |
| Autre | Demande non classifiable ou hors périmètre |

---

## Vue 4 — Rapport mensuel (lecture seule)

### Description

Affichage du rapport mensuel généré par ATLAS OPS, accessible par le client directement dans le tableau de bord.

### Maquette filaire

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Retour  │  Rapports mensuels — [Nom client]                 │
├─────────────────────────────────────────────────────────────────┤
│  Rapport du mois en cours     [Télécharger en PDF]             │
│                                                                  │
│  [Rapport rendu en HTML dans le tableau de bord]               │
│  [Contenu identique au template ATLAS_OPS_Reporting_Mensuel]   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  Historique des rapports                                        │
│                                                                  │
│  Rapport [Mois N-1]    [Télécharger PDF]                       │
│  Rapport [Mois N-2]    [Télécharger PDF]                       │
│  Rapport [Mois N-3]    [Télécharger PDF]                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Vue 5 — Paramètres client

### Description

Informations du compte et configuration. Le client peut consulter mais pas modifier (lecture seule). Seul Billal (Admin) peut modifier la configuration.

### Maquette filaire

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Retour  │  Paramètres — [Nom client]                        │
├──────────────────────────────┬──────────────────────────────────┤
│  MON COMPTE                  │  MON CONTRAT                     │
│                              │                                  │
│  Entreprise : [Nom]          │  Pack : [Pilote/Standard/Duo]    │
│  Contact : [Prénom Nom]      │  Démarrage : [JJ/MM/AAAA]        │
│  Email : [email]             │  Prochaine échéance : [date]     │
│                              │  Statut : ✅ Actif               │
├──────────────────────────────┴──────────────────────────────────┤
│  CONFIGURATION DE L'AGENT (lecture seule)                       │
│                                                                  │
│  Canal principal : [Email / WhatsApp]                           │
│  Déclencheur : [48h sans réponse]                               │
│  Plage horaire : [Lun–Ven 8h–18h]                               │
│  Contact d'escalade : [Prénom Nom — email/tel]                  │
│  Dernière mise à jour de la configuration : [date]              │
│                                                                  │
│  Pour modifier votre configuration : contact@atlasops.fr        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Spécifications techniques fonctionnelles

### Authentification

- Connexion par **email + code à usage unique** (6 chiffres, valable 10 minutes). Aucun mot de passe.
- Session active : 8 heures, puis ré-authentification requise.
- En cas de tentatives répétées : blocage temporaire de 30 minutes après 5 échecs.

### Rôles et accès

| Rôle | Accès |
|---|---|
| **Administrateur (ATLAS OPS)** | Accès à tous les clients, toutes les vues, possibilité de modifier les configurations |
| **Lecteur (Client)** | Accès uniquement à ses propres données, vues 1 à 5 en lecture seule |

### Fréquence de mise à jour des données

- Indicateurs du tableau de bord principal : toutes les **24 heures** (traitement nocturne)
- Journal d'activité : toutes les **6 heures**
- Alertes critiques (agent arrêté, connexion interrompue) : en quasi-temps réel (délai < 15 minutes)

### Notifications email

| Événement | Destinataire | Délai |
|---|---|---|
| Nouveau rapport mensuel disponible | Client | Dès la mise en ligne |
| Escalade J+7 transmise | Client | Immédiat |
| Agent arrêté > 4 heures | Billal (Admin) | Immédiat |
| Connexion au canal interrompue | Billal (Admin) + Client | < 30 min |

### Notifications WhatsApp

Les notifications critiques (escalade client, agent arrêté) peuvent également être transmises via WhatsApp Business, sur le numéro désigné lors de la configuration. À activer au cas par cas selon la préférence du client.

### Accessibilité et compatibilité

- Cible : WCAG 2.1 niveau AA
- Navigateurs supportés : Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Responsive : lisible sur mobile (largeur min. 375px) sans perte de contenu critique

---

## Évolutions prévues (roadmap)

| Version | Contenu |
|---|---|
| **v1 (actuelle)** | Vues 1 à 5, indicateurs clés, journal d'activité, rapports mensuels, authentification OTP |
| **v2** | Notifications push mobile, export CSV des journaux, graphiques comparatifs mois-sur-mois |
| **v3** | Modification de la configuration par le client (périmètre limité), interface de création de la base de connaissance (Atlas Flow) |

---

*ATLAS OPS — Document interne — Ne pas diffuser — contact@atlasops.fr*
