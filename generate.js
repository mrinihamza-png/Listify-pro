import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = { api: { bodyParser: false } }

const PROMPT = `Tu es un expert en revente de vêtements sur Vinted avec 10 ans d'expérience. Tu identifies parfaitement les marques, modèles, coloris et états des articles rien qu'en regardant les photos. Tu connais les prix du marché Vinted en temps réel.

Analyse les photos et génère une annonce PARFAITE et COMPLÈTE.

Retourne UNIQUEMENT un objet JSON valide (zéro texte avant ou après, zéro markdown) :
{
  "titre": "Titre Vinted accrocheur, max 60 caractères, avec marque + modèle + couleur + taille",
  "description": "Description complète avec emojis. Commence par la marque et le modèle. Inclus : matière, coloris exact, coupe, poches, fermetures, logo, état détaillé, conseils d'entretien. Minimum 8 lignes.",
  "hashtags": "#tag1 #tag2 #tag3 (20 hashtags très pertinents séparés par des espaces)",
  "marque": "Marque exacte",
  "modele": "Modèle/référence si identifiable",
  "taille": "Taille indiquée sur l'étiquette",
  "couleur": "Couleur exacte",
  "matiere": "Composition matière si visible",
  "etat": "Neuf avec étiquette / Neuf sans étiquette / Très bon état / Bon état / Satisfaisant",
  "categorie": "Catégorie Vinted exacte",
  "prix_neuf": 0,
  "prix_conseille": 0,
  "prix_minimum": 0,
  "conseil_prix": "Explication courte de la stratégie de prix basée sur le marché Vinted actuel"
}`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const form = formidable({ maxFileSize: 20 * 1024 * 1024 })
    const [, files] = await form.parse(req)

    const imageFiles = files.images || []
    const imageContents = await Promise.all(
      imageFiles.map(async (file) => {
        const data = fs.readFileSync(file.filepath)
        const base64 = data.toString('base64')
        const mimeType = file.mimetype || 'image/jpeg'
        return { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } }
      })
    )

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://listify-pro.vercel.app',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        max_tokens: 1500,
        messages: [
          { role: 'system', content: PROMPT },
          { role: 'user', content: [...imageContents, { type: 'text', text: "Analyse ces photos et génère l'annonce Vinted complète en JSON." }] }
        ]
      })
    })

    const data = await response.json()
    if (data.error) throw new Error(data.error.message)

    const raw = data.choices?.[0]?.message?.content || ''
    const clean = raw.replace(/```json|```/g, '').trim()
    const result = JSON.parse(clean)

    res.status(200).json(result)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
