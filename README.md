# ✦ TaskFlow - Gestionnaire de Tâches Collaboratif

TaskFlow est une application web moderne de type SPA (Single Page Application) développée en pair-programming fullstack. Elle intègre un **Back-end API Django robuste** couplé à une base de données **PostgreSQL**, et un **Front-end dynamique développé en React + Vite** au design épuré, interactif et premium.

---

## 📝 Fonctionnalités Principales

* 📂 **Gestion des Projets :** Liste exhaustive des projets, statistiques dynamiques et accès direct aux détails.
* 📋 **Tableau de Bord des Tâches :**
  * Création de tâches rattachées à un projet avec attribution de statut (*À faire*, *En cours*, *Terminée*).
  * Modification rapide et en ligne (inline editing) du titre et du statut d'une tâche.
  * Suppression réactive avec confirmations fluides.
* 📊 **Indicateurs de Performance (KPIs) :** Calcul en temps réel de la progression des tâches par projet (badges de progression interactifs).
* ✨ **Expérience Premium (UX/UI) :** Design fluide conçu en CSS moderne (variables HSL, micro-animations sur les boutons, cartes en Glassmorphisme, état de chargement élégant).

---

## 🛠️ Technologies Utilisées

### Back-end
* **Langage & Framework :** Python 3.13, Django 6.0
* **API REST :** Django REST Framework (DRF)
* **Base de Données :** PostgreSQL
* **Sécurité :** CORS-headers pour sécuriser les liaisons d'origines croisées.

### Front-end
* **Framework :** React 19 (Hooks modernisés, gestion réactive propre)
* **Build tool :** Vite 8 (rechargement à chaud ultra-rapide)
* **Routage :** React Router DOM v7
* **Linter & Qualité :** ESLint (Conformité de code stricte à 100%, 0 warning, 0 erreur).

---

## ⚙️ Installation et Lancement en Local

Suivez ces étapes simples pour faire tourner l'application entière sur votre machine de développement :

### 1. Clonage du Projet
```bash
git clone https://github.com/Dibangoup/gestionnaire_taches_django.git
cd gestionnaire_taches_django
```

### 2. Configuration du Back-end (Django + PostgreSQL)

1. **Créer et activer l'environnement virtuel :**
   ```bash
   python -m venv venv
   # Sur Windows :
   venv\Scripts\activate
   # Sur macOS/Linux :
   source venv/bin/activate
   ```

2. **Installer les dépendances Python :**
   ```bash
   pip install -r requirements.txt
   ```

3. **Créer le fichier de variables d'environnement `.env` :**
   Créez un fichier nommé `.env` à la racine du projet et renseignez-y vos identifiants PostgreSQL :
   ```env
   NAME=gestionnaire_taches_db
   USER=votre_utilisateur_postgres
   PASSWORD=votre_mot_de_passe
   HOST=localhost
   PORT=5432
   ```

4. **Lancer les migrations de la base de données :**
   ```bash
   python manage.py migrate
   ```

5. **Démarrer le serveur de développement Django :**
   ```bash
   python manage.py runserver
   ```
   Le backend tourne maintenant sur [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

### 3. Configuration du Front-end (React + Vite)

1. **Se rendre dans le dossier du frontend :**
   ```bash
   cd frontend
   ```

2. **Installer les paquets npm :**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement Vite :**
   ```bash
   npm run dev
   ```
   Le frontend est maintenant disponible sur [http://localhost:5173/](http://localhost:5173/).

---

## 🧪 Qualité de Code & Validation
Le frontend intègre des règles d'analyse de code strictes et un linter de production. Pour s'assurer de l'excellence de la base de code, vous pouvez lancer la commande suivante dans le dossier `frontend` :
```bash
npm run lint
```
*Toutes les règles de cycle de vie React (incluant `react-hooks/set-state-in-effect` et `react-hooks/exhaustive-deps`) sont parfaitement respectées.*