import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')

  return (
    <>
      <Head>
        <title>Listify Pro – Génère tes annonces Vinted en 10 secondes</title>
        <meta name="description" content="Tu vends sur Vinted ? Listify Pro génère pour toi des descriptions parfaites, des hashtags optimisés et un prix conseillé — grâce à l'IA." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAVBAR */}
      <nav style={nav.bar}>
        <div style={nav.logo}>Listify <span style={nav.badge}>PRO</span></div>
        <div style={nav.links}>
          <a href="#pricing" style={nav.link}>Tarifs</a>
          <Link href="/app" style={nav.cta}>Essayer gratuitement →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={hero.section}>
        <div style={hero.tag}>🤖 Propulsé par l'intelligence artificielle</div>
        <h1 style={hero.h1}>
          Tes annonces Vinted<br />
          <span style={hero.h1Accent}>en 10 secondes</span>
        </h1>
        <p style={hero.sub}>
          Tu prends des photos → l'IA identifie la marque, génère une description parfaite,<br />
          trouve les meilleurs hashtags et te conseille le prix idéal.
        </p>
        <div style={hero.actions}>
          <Link href="/app" style={hero.btnPrimary}>✨ Générer mon annonce gratuite</Link>
          <a href="#how" style={hero.btnSecondary}>Voir comment ça marche</a>
        </div>
        <p style={hero.social}>⭐⭐⭐⭐⭐ Déjà utilisé par +500 vendeurs Vinted</p>
      </section>

      {/* DEMO SCREENSHOT */}
      <section style={demo.section}>
        <div style={demo.card}>
          <div style={demo.bar}>
            <span style={demo.dot('red')} /><span style={demo.dot('orange')} /><span style={demo.dot('green')} />
            <span style={demo.url}>listify-pro.vercel.app/app</span>
          </div>
          <div style={demo.content}>
            <div style={demo.left}>
              <div style={demo.photoGrid}>
                {['👕','🏷️','📏','🔍'].map((e,i) => (
                  <div key={i} style={demo.photoBox}>{e}</div>
                ))}
              </div>
              <div style={demo.genBtn}>✨ Générer l'annonce</div>
            </div>
            <div style={demo.right}>
              <div style={demo.resultChip}>✅ Annonce générée</div>
              <div style={demo.resultLine}>Jordan Brand Basketball Short Navy – M</div>
              <div style={demo.resultBody}>Short de basketball Jordan Brand mesh perforé bleu marine. Logo Jumpman brodé, taille élastique, made in Thailand…</div>
              <div style={demo.priceRow}>
                <div style={demo.price(false)}>Neuf<br/><b>~75€</b></div>
                <div style={demo.price(true)}>✅ Conseillé<br/><b>25€</b></div>
                <div style={demo.price(false)}>Mini<br/><b>18€</b></div>
              </div>
              <div style={demo.copyBtn}>📋 Copier tout pour Vinted</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={section.wrap}>
        <h2 style={section.h2}>Comment ça marche ?</h2>
        <p style={section.sub}>3 étapes. Moins de 30 secondes.</p>
        <div style={steps.grid}>
          {[
            { n: '01', icon: '📸', title: 'Tu uploades tes photos', desc: 'Avant, arrière, étiquette — jusqu\'à 10 photos par article.' },
            { n: '02', icon: '🤖', title: 'L\'IA analyse tout', desc: 'Identification de la marque, état, couleur, matière, valeur marché.' },
            { n: '03', icon: '📋', title: 'Tu copies-colles sur Vinted', desc: 'Titre + description + hashtags + prix en un seul clic.' },
          ].map(s => (
            <div key={s.n} style={steps.card}>
              <div style={steps.num}>{s.n}</div>
              <div style={steps.icon}>{s.icon}</div>
              <h3 style={steps.title}>{s.title}</h3>
              <p style={steps.desc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ ...section.wrap, background: '#fff' }}>
        <h2 style={section.h2}>Tout ce que Listify génère pour toi</h2>
        <div style={features.grid}>
          {[
            { icon: '🏷️', title: 'Titre optimisé', desc: 'Marque + modèle + couleur + taille en 60 caractères.' },
            { icon: '📝', title: 'Description complète', desc: 'Matière, coupe, poches, état, conseils entretien.' },
            { icon: '#️⃣', title: '20 hashtags pertinents', desc: 'Les bons mots-clés pour être trouvé sur Vinted.' },
            { icon: '💰', title: 'Prix conseillé', desc: 'Basé sur les prix du marché Vinted en temps réel.' },
            { icon: '🔍', title: 'Identification de marque', desc: 'Reconnaît Jordan, FOG, Supreme, Nike, Adidas et +500 marques.' },
            { icon: '⚡', title: 'Résultat en 10 secondes', desc: 'Plus rapide qu\'écrire toi-même. Bien mieux aussi.' },
          ].map(f => (
            <div key={f.title} style={features.card}>
              <div style={features.icon}>{f.icon}</div>
              <h3 style={features.title}>{f.title}</h3>
              <p style={features.desc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={section.wrap}>
        <h2 style={section.h2}>Des tarifs simples</h2>
        <p style={section.sub}>Commence gratuitement. Passe Pro quand tu veux.</p>
        <div style={pricing.grid}>
          {[
            {
              name: 'Gratuit', price: '0€', period: '/mois',
              features: ['5 annonces/mois', 'Titre + Description', 'Prix conseillé', 'Support email'],
              cta: 'Commencer gratuitement', hl: false
            },
            {
              name: 'Pro', price: '4,99€', period: '/mois',
              features: ['100 annonces/mois', 'Tout du plan gratuit', '20 hashtags inclus', 'Identification marque avancée', 'Support prioritaire'],
              cta: 'Passer Pro →', hl: true
            },
            {
              name: 'Illimité', price: '9,99€', period: '/mois',
              features: ['Annonces illimitées', 'Tout du plan Pro', 'Accès API', 'Badge vendeur pro'],
              cta: 'Choisir Illimité', hl: false
            },
          ].map(p => (
            <div key={p.name} style={pricing.card(p.hl)}>
              {p.hl && <div style={pricing.popular}>⭐ Le plus populaire</div>}
              <div style={pricing.name}>{p.name}</div>
              <div style={pricing.price}>{p.price}<span style={pricing.period}>{p.period}</span></div>
              <ul style={pricing.list}>
                {p.features.map(f => <li key={f} style={pricing.item}>✓ {f}</li>)}
              </ul>
              <Link href="/app" style={pricing.btn(p.hl)}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ ...section.wrap, background: '#fff' }}>
        <h2 style={section.h2}>Ce qu'ils en pensent</h2>
        <div style={testi.grid}>
          {[
            { name: 'Sarah M.', tag: 'Vendeuse Vinted ⭐⭐⭐⭐⭐', text: 'Je gagnais 1h par semaine à écrire mes annonces. Maintenant c\'est 10 secondes. Mes ventes ont augmenté de 30%.' },
            { name: 'Karim B.', tag: 'Revendeur streetwear ⭐⭐⭐⭐⭐', text: 'L\'IA reconnaît même les colabs rares. Description parfaite à chaque fois. Indispensable.' },
            { name: 'Julie T.', tag: 'Top vendeur Vinted ⭐⭐⭐⭐⭐', text: 'Le prix conseillé est vraiment juste. J\'ai arrêté de vendre trop pas cher grâce à ça.' },
          ].map(t => (
            <div key={t.name} style={testi.card}>
              <p style={testi.text}>"{t.text}"</p>
              <div style={testi.author}>{t.name}</div>
              <div style={testi.role}>{t.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={cta.section}>
        <h2 style={cta.h2}>Prêt à vendre plus vite ?</h2>
        <p style={cta.sub}>Rejoins 500+ vendeurs qui utilisent Listify Pro</p>
        <Link href="/app" style={cta.btn}>✨ Générer ma première annonce — c'est gratuit</Link>
      </section>

      {/* FOOTER */}
      <footer style={footer.bar}>
        <div style={footer.logo}>Listify <span style={nav.badge}>PRO</span></div>
        <div style={footer.links}>
          <a href="#" style={footer.link}>CGU</a>
          <a href="#" style={footer.link}>Confidentialité</a>
          <a href="mailto:contact@listify-pro.fr" style={footer.link}>Contact</a>
        </div>
        <div style={footer.copy}>© 2025 Listify Pro. Tous droits réservés.</div>
      </footer>
    </>
  )
}

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const nav = {
  bar: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(247,245,242,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E8E4DE', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.5px' },
  badge: { background: '#2D6A4F', color: '#fff', padding: '2px 8px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700, marginLeft: 6 },
  links: { display: 'flex', alignItems: 'center', gap: 24 },
  link: { color: '#5A5550', fontSize: '0.9rem', fontWeight: 500 },
  cta: { background: '#2D6A4F', color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: '0.88rem', fontWeight: 700 },
}

const hero = {
  section: { textAlign: 'center', padding: '80px 20px 60px', maxWidth: 780, margin: '0 auto' },
  tag: { display: 'inline-block', background: '#D8F3DC', color: '#2D6A4F', padding: '6px 16px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600, marginBottom: 24 },
  h1: { fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' },
  h1Accent: { color: '#2D6A4F' },
  sub: { fontSize: '1.05rem', color: '#5A5550', lineHeight: 1.7, marginBottom: 36 },
  actions: { display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 },
  btnPrimary: { background: '#2D6A4F', color: '#fff', padding: '15px 28px', borderRadius: 12, fontSize: '1rem', fontWeight: 700, display: 'inline-block' },
  btnSecondary: { background: '#fff', color: '#1A1A1A', padding: '15px 28px', borderRadius: 12, fontSize: '1rem', fontWeight: 600, border: '1px solid #E8E4DE', display: 'inline-block' },
  social: { color: '#8A8680', fontSize: '0.82rem' },
}

const demo = {
  section: { padding: '0 20px 60px', maxWidth: 900, margin: '0 auto' },
  card: { background: '#fff', borderRadius: 16, border: '1px solid #E8E4DE', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' },
  bar: { background: '#F0EDEA', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 },
  dot: (c) => ({ width: 12, height: 12, borderRadius: '50%', background: c === 'red' ? '#FF5F56' : c === 'orange' ? '#FFBD2E' : '#27C93F', display: 'inline-block' }),
  url: { marginLeft: 12, fontSize: '0.78rem', color: '#8A8680', background: '#fff', padding: '3px 12px', borderRadius: 6, flex: 1, textAlign: 'center' },
  content: { display: 'flex', gap: 0, minHeight: 280 },
  left: { flex: 1, padding: 24, borderRight: '1px solid #E8E4DE', display: 'flex', flexDirection: 'column', gap: 16 },
  photoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  photoBox: { aspectRatio: '1', background: '#F7F5F2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid #E8E4DE' },
  genBtn: { background: '#2D6A4F', color: '#fff', padding: '12px', borderRadius: 10, textAlign: 'center', fontSize: '0.88rem', fontWeight: 700 },
  right: { flex: 1.5, padding: 24, display: 'flex', flexDirection: 'column', gap: 10 },
  resultChip: { background: '#D8F3DC', color: '#2D6A4F', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', width: 'fit-content' },
  resultLine: { fontWeight: 700, fontSize: '0.9rem' },
  resultBody: { fontSize: '0.8rem', color: '#5A5550', lineHeight: 1.5 },
  priceRow: { display: 'flex', gap: 8 },
  price: (hl) => ({ flex: 1, background: hl ? '#D8F3DC' : '#F7F5F2', border: `1px solid ${hl ? '#52B788' : '#E8E4DE'}`, borderRadius: 8, padding: '8px', textAlign: 'center', fontSize: '0.75rem', color: hl ? '#2D6A4F' : '#5A5550' }),
  copyBtn: { background: '#2D6A4F', color: '#fff', padding: '10px', borderRadius: 8, textAlign: 'center', fontSize: '0.82rem', fontWeight: 700, marginTop: 'auto' },
}

const section = {
  wrap: { padding: '72px 20px', maxWidth: 1000, margin: '0 auto' },
  h2: { fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, textAlign: 'center', marginBottom: 12, letterSpacing: '-0.5px' },
  sub: { color: '#8A8680', textAlign: 'center', fontSize: '1rem', marginBottom: 48 },
}

const steps = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 24 },
  card: { background: '#fff', borderRadius: 16, padding: '28px 24px', border: '1px solid #E8E4DE' },
  num: { fontSize: '0.7rem', fontWeight: 700, color: '#2D6A4F', letterSpacing: 2, marginBottom: 12 },
  icon: { fontSize: '2rem', marginBottom: 12 },
  title: { fontWeight: 700, fontSize: '1rem', marginBottom: 8 },
  desc: { color: '#8A8680', fontSize: '0.88rem', lineHeight: 1.6 },
}

const features = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20, maxWidth: 1000, margin: '48px auto 0' },
  card: { background: '#F7F5F2', borderRadius: 14, padding: '22px 20px', border: '1px solid #E8E4DE' },
  icon: { fontSize: '1.8rem', marginBottom: 10 },
  title: { fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 },
  desc: { color: '#8A8680', fontSize: '0.83rem', lineHeight: 1.55 },
}

const pricing = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 20, maxWidth: 900, margin: '48px auto 0' },
  card: (hl) => ({ background: hl ? '#2D6A4F' : '#fff', borderRadius: 16, padding: '28px 24px', border: `2px solid ${hl ? '#2D6A4F' : '#E8E4DE'}`, position: 'relative', overflow: 'hidden' }),
  popular: { background: '#52B788', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, display: 'inline-block', marginBottom: 16 },
  name: { fontSize: '0.8rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#8A8680', marginBottom: 8 },
  price: { fontSize: '2.2rem', fontWeight: 900, marginBottom: 4 },
  period: { fontSize: '1rem', fontWeight: 400, color: '#8A8680' },
  list: { listStyle: 'none', margin: '20px 0 24px', display: 'flex', flexDirection: 'column', gap: 8 },
  item: { fontSize: '0.88rem', color: '#5A5550' },
  btn: (hl) => ({ display: 'block', textAlign: 'center', padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: '0.92rem', background: hl ? '#fff' : '#2D6A4F', color: hl ? '#2D6A4F' : '#fff' }),
}

const testi = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 20, maxWidth: 900, margin: '48px auto 0' },
  card: { background: '#F7F5F2', borderRadius: 16, padding: '24px', border: '1px solid #E8E4DE' },
  text: { fontSize: '0.92rem', lineHeight: 1.65, color: '#1A1A1A', marginBottom: 16, fontStyle: 'italic' },
  author: { fontWeight: 700, fontSize: '0.9rem' },
  role: { color: '#8A8680', fontSize: '0.78rem', marginTop: 3 },
}

const cta = {
  section: { background: '#2D6A4F', padding: '72px 20px', textAlign: 'center' },
  h2: { fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#fff', marginBottom: 12, letterSpacing: '-0.5px' },
  sub: { color: '#D8F3DC', fontSize: '1rem', marginBottom: 36 },
  btn: { display: 'inline-block', background: '#fff', color: '#2D6A4F', padding: '16px 32px', borderRadius: 12, fontSize: '1rem', fontWeight: 800 },
}

const footer = {
  bar: { background: '#1A1A1A', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 },
  logo: { fontSize: '1.1rem', fontWeight: 800, color: '#fff' },
  links: { display: 'flex', gap: 20 },
  link: { color: '#8A8680', fontSize: '0.85rem' },
  copy: { color: '#8A8680', fontSize: '0.78rem', width: '100%', textAlign: 'center', marginTop: 8 },
}
