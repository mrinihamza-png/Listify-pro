# 🚀 Listify Pro – Guide de déploiement complet

## Ce que tu as
- Une page d'accueil commerciale (landing page)
- L'outil générateur d'annonces Vinted par IA
- Une API sécurisée côté serveur (ta clé OpenRouter est cachée)

---

## ÉTAPE 1 – Crée un compte GitHub (gratuit)
1. Va sur **github.com**
2. Clique "Sign up" → crée un compte
3. Vérifie ton email

---

## ÉTAPE 2 – Upload le code sur GitHub
1. Sur GitHub, clique le "+" en haut → "New repository"
2. Nom : `listify-pro`
3. Laisse tout par défaut → clique "Create repository"
4. Clique "uploading an existing file"
5. Glisse-dépose TOUS les fichiers du dossier `listify/`
6. Clique "Commit changes"

---

## ÉTAPE 3 – Déploie sur Vercel (gratuit)
1. Va sur **vercel.com** → "Sign up with GitHub"
2. Clique "New Project"
3. Sélectionne ton repo `listify-pro`
4. Clique "Deploy" → Vercel détecte Next.js automatiquement

---

## ÉTAPE 4 – Configure tes variables d'environnement
Dans Vercel → ton projet → "Settings" → "Environment Variables" :

| Nom | Valeur |
|-----|--------|
| `OPENROUTER_API_KEY` | Ta clé sk-or-... |
| `NEXT_PUBLIC_SITE_URL` | https://listify-pro.vercel.app |

Puis clique "Redeploy" pour appliquer.

---

## ÉTAPE 5 – Ajoute les paiements Stripe (optionnel pour commencer)
1. Crée un compte sur **stripe.com**
2. Récupère tes clés API dans Dashboard → Developers → API keys
3. Ajoute-les dans Vercel :
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

---

## Résultat final
Ton site sera accessible à : `https://listify-pro.vercel.app`

**Coût total : 0€/mois** (jusqu'à 100 déploiements/jour sur Vercel gratuit)

---

## Structure des fichiers
```
listify/
├── pages/
│   ├── index.js          ← Page d'accueil (landing page)
│   ├── app.js            ← L'outil générateur
│   ├── _app.js           ← Configuration globale
│   └── api/
│       └── generate.js   ← API sécurisée (clé cachée côté serveur)
├── styles/
│   └── globals.css       ← Styles globaux
├── .env.example          ← Template des variables d'environnement
├── next.config.js        ← Configuration Next.js
└── package.json          ← Dépendances
```

---

## Support
Des questions ? Reviens sur Claude et montre-moi exactement où tu bloques !
