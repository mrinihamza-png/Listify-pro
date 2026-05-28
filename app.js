import { useState, useRef, useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'

function useClipboard() {
  const [copied, setCopied] = useState('')
  const copy = useCallback((text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(''), 2200)
    })
  }, [])
  return { copied, copy }
}

export default function AppPage() {
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [drag, setDrag] = useState(false)
  const { copied, copy } = useClipboard()
  const inputRef = useRef()

  function handleFiles(incoming) {
    const imgs = [...incoming].filter(f => f.type.startsWith('image/')).slice(0, 10)
    setFiles(imgs)
    setResult(null)
    setError('')
    setPreviews(imgs.map(f => URL.createObjectURL(f)))
  }

  function removeFile(idx) {
    const nf = files.filter((_, i) => i !== idx)
    setFiles(nf)
    setPreviews(nf.map(f => URL.createObjectURL(f)))
    if (nf.length === 0) setResult(null)
  }

  async function generate() {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const formData = new FormData()
      files.forEach(f => formData.append('images', f))

      const resp = await fetch('/api/generate', { method: 'POST', body: formData })
      const data = await resp.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch (e) {
      setError('❌ ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setFiles([]); setPreviews([]); setResult(null); setError('')
  }

  const allText = result ? `${result.titre}\n\n${result.description}\n\n${result.hashtags}` : ''

  return (
    <>
      <Head>
        <title>Générateur – Listify Pro</title>
      </Head>

      {/* NAVBAR */}
      <nav style={S.nav}>
        <Link href="/" style={S.logo}>Listify <span style={S.badge}>PRO</span></Link>
        <div style={S.navRight}>
          <span style={S.planChip}>✨ Plan Gratuit · 5 analyses restantes</span>
        </div>
      </nav>

      <div style={S.page}>
        <div style={S.container}>

          {/* UPLOAD CARD */}
          <div style={S.card}>
            <div style={S.cardHeader}>
              <div style={S.cardTitle}>📷 Tes photos</div>
              <div style={S.cardSub}>Avant + arrière + étiquette = meilleur résultat</div>
            </div>

            {/* DROP ZONE */}
            <div
              style={S.drop(drag)}
              onClick={() => inputRef.current.click()}
              onDragOver={e => { e.preventDefault(); setDrag(true) }}
              onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files) }}
            >
              <input ref={inputRef} type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
              {previews.length === 0 ? (
                <>
                  <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>📸</div>
                  <div style={S.dropTitle}>Clique ou glisse tes photos ici</div>
                  <div style={S.dropSub}>Jusqu'à 10 photos · JPG, PNG, HEIC</div>
                </>
              ) : (
                <div style={S.dropTitle}>{files.length} photo(s) chargée(s) — clique pour en ajouter</div>
              )}
            </div>

            {/* PREVIEWS */}
            {previews.length > 0 && (
              <div style={S.grid}>
                {previews.map((url, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={url} alt="" style={S.thumb} />
                    <button onClick={() => removeFile(i)} style={S.removeBtn}>✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* GENERATE BUTTON */}
            <button
              style={S.genBtn(files.length === 0 || loading)}
              onClick={generate}
              disabled={files.length === 0 || loading}
            >
              {loading ? (
                <><span style={S.spinner} />Analyse en cours…</>
              ) : '✨ Générer l\'annonce Vinted'}
            </button>
          </div>

          {/* ERROR */}
          {error && <div style={S.errorBox}>{error}</div>}

          {/* RESULT */}
          {result && (
            <div style={{ ...S.card, animation: 'fadeUp 0.4s ease' }}>
              {/* Header */}
              <div style={S.resultHeader}>
                <div style={S.resultTitle}>✅ Annonce prête à publier</div>
                <button style={S.copyAllBtn} onClick={() => copy(allText, 'all')}>
                  {copied === 'all' ? '✅ Tout copié !' : '📋 Tout copier pour Vinted'}
                </button>
              </div>

              {/* Chips */}
              <div style={{ padding: '0 22px', display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                {[
                  { label: result.marque, c: '#1A1A1A' },
                  { label: result.taille, c: '#2D6A4F' },
                  { label: result.etat, c: '#D97706' },
                  { label: result.couleur, c: '#7C3AED' },
                  { label: result.categorie, c: '#0891B2' },
                ].filter(x => x.label).map((x, i) => (
                  <span key={i} style={{ background: x.c + '18', color: x.c, padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>{x.label}</span>
                ))}
              </div>

              <div style={{ padding: '0 22px 24px' }}>
                {/* Titre */}
                <Field label="Titre" content={result.titre} copyKey="titre" accent="#2D6A4F" copied={copied} onCopy={copy} />

                {/* Description */}
                <Field label="Description" content={result.description} copyKey="desc" accent="#52B788" copied={copied} onCopy={copy} pre />

                {/* Hashtags */}
                <div>
                  <Label>Hashtags</Label>
                  <div style={{ ...S.fieldBox('#4F46E5'), display: 'flex', flexWrap: 'wrap', gap: 0 }}>
                    {result.hashtags.split(' ').filter(t => t.startsWith('#')).map((t, i) => (
                      <span key={i} style={S.tagChip}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                    <CopyBtn text={result.hashtags} label="Hashtags" copyKey="tags" copied={copied} onCopy={copy} />
                  </div>
                </div>

                {/* Prix */}
                <Label>💰 Stratégie de prix</Label>
                <div style={S.priceGrid}>
                  {[
                    { label: 'Prix neuf', amount: `~${result.prix_neuf}€`, sub: 'Retail', hl: false },
                    { label: '✅ Conseillé', amount: `${result.prix_conseille}€`, sub: 'Optimal', hl: true },
                    { label: 'Plancher', amount: `${result.prix_minimum}€`, sub: 'Minimum', hl: false },
                  ].map(p => (
                    <div key={p.label} style={S.priceCard(p.hl)}>
                      <div style={S.priceLabel(p.hl)}>{p.label}</div>
                      <div style={S.priceAmount(p.hl)}>{p.amount}</div>
                      <div style={S.priceSub}>{p.sub}</div>
                    </div>
                  ))}
                </div>
                <div style={S.conseilBox}>💡 {result.conseil_prix}</div>

                {/* BIG COPY BUTTON */}
                <div style={S.bigCopyZone}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#2D6A4F', fontSize: '0.95rem' }}>Prêt à coller sur Vinted ?</div>
                    <div style={{ fontSize: '0.8rem', color: '#5A5550', marginTop: 3 }}>Titre + Description + Hashtags en un seul clic</div>
                  </div>
                  <button style={S.bigCopyBtn} onClick={() => copy(allText, 'vinted')}>
                    {copied === 'vinted' ? '✅ Copié ! Colle sur Vinted maintenant' : '📋 Copier tout pour Vinted'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RESET */}
          {result && (
            <button onClick={reset} style={S.resetBtn}>🔄 Analyser un nouvel article</button>
          )}

          <div style={S.tip}>
            💡 <strong>Astuce :</strong> Prends toujours une photo de l'étiquette intérieure pour une description 2× plus précise.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>
    </>
  )
}

function Label({ children }) {
  return <div style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#8A8680', marginBottom: 7, marginTop: 20 }}>{children}</div>
}

function Field({ label, content, copyKey, accent, copied, onCopy, pre }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ background: '#FAFAF8', borderRadius: 10, padding: '13px 15px', fontSize: '0.91rem', lineHeight: 1.7, borderLeft: `3px solid ${accent}`, color: '#1A1A1A', border: '1px solid #E8E4DE', borderLeftWidth: 3, borderLeftColor: accent, whiteSpace: pre ? 'pre-wrap' : 'normal', wordBreak: 'break-word' }}>
        {content}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
        <CopyBtn text={content} label={label} copyKey={copyKey} copied={copied} onCopy={onCopy} />
      </div>
    </div>
  )
}

function CopyBtn({ text, label, copyKey, copied, onCopy }) {
  const active = copied === copyKey
  return (
    <button onClick={() => onCopy(text, copyKey)} style={{ background: active ? '#D8F3DC' : '#FAFAF8', color: active ? '#2D6A4F' : '#5A5550', border: `1px solid ${active ? '#52B788' : '#E8E4DE'}`, padding: '8px 14px', borderRadius: 7, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s' }}>
      {active ? `✅ Copié !` : `📋 Copier ${label.toLowerCase()}`}
    </button>
  )
}

const S = {
  nav: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(247,245,242,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E8E4DE', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.5px', color: '#1A1A1A' },
  badge: { background: '#2D6A4F', color: '#fff', padding: '2px 7px', borderRadius: 5, fontSize: '0.65rem', fontWeight: 700, marginLeft: 6 },
  navRight: { display: 'flex', alignItems: 'center', gap: 12 },
  planChip: { background: '#D8F3DC', color: '#2D6A4F', padding: '5px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600 },
  page: { background: '#F7F5F2', minHeight: 'calc(100vh - 60px)', padding: '28px 16px 60px' },
  container: { maxWidth: 700, margin: '0 auto' },
  card: { background: '#fff', borderRadius: 16, border: '1px solid #E8E4DE', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 16 },
  cardHeader: { padding: '20px 22px 0' },
  cardTitle: { fontWeight: 800, fontSize: '1rem', marginBottom: 3 },
  cardSub: { fontSize: '0.8rem', color: '#8A8680', marginBottom: 16 },
  drop: (drag) => ({ border: `2px dashed ${drag ? '#2D6A4F' : '#E8E4DE'}`, borderRadius: 12, padding: '36px 20px', textAlign: 'center', cursor: 'pointer', background: drag ? '#F0FFF4' : '#FAFAF8', transition: 'all 0.25s', margin: '0 22px' }),
  dropTitle: { fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 },
  dropSub: { color: '#8A8680', fontSize: '0.82rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px,1fr))', gap: 7, padding: '14px 22px 0' },
  thumb: { width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 8, border: '1px solid #E8E4DE', display: 'block' },
  removeBtn: { position: 'absolute', top: 3, right: 3, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  genBtn: (disabled) => ({ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: 'calc(100% - 44px)', margin: '16px 22px 22px', padding: '15px', background: disabled ? '#E0DDD8' : '#2D6A4F', color: disabled ? '#8A8680' : '#fff', border: 'none', borderRadius: 10, fontSize: '1rem', fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }),
  spinner: { width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' },
  resultHeader: { background: '#D8F3DC', padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, borderBottom: '1px solid #E8E4DE' },
  resultTitle: { fontWeight: 800, color: '#2D6A4F', fontSize: '1rem' },
  copyAllBtn: { background: '#2D6A4F', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  fieldBox: (accent) => ({ background: '#FAFAF8', borderRadius: 10, padding: '13px 15px', fontSize: '0.91rem', lineHeight: 1.7, border: '1px solid #E8E4DE', borderLeft: `3px solid ${accent}`, color: '#1A1A1A' }),
  tagChip: { display: 'inline-block', background: '#EEF2FF', color: '#4F46E5', padding: '3px 9px', borderRadius: 20, fontSize: '0.76rem', fontWeight: 600, margin: '2px 3px 2px 0' },
  priceGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 10 },
  priceCard: (hl) => ({ background: hl ? '#D8F3DC' : '#FAFAF8', border: `1px solid ${hl ? '#52B788' : '#E8E4DE'}`, borderRadius: 10, padding: '14px 10px', textAlign: 'center' }),
  priceLabel: (hl) => ({ fontSize: '0.65rem', color: hl ? '#2D6A4F' : '#8A8680', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }),
  priceAmount: (hl) => ({ fontSize: '1.45rem', fontWeight: 800, color: hl ? '#2D6A4F' : '#1A1A1A', margin: '4px 0 2px' }),
  priceSub: { fontSize: '0.68rem', color: '#8A8680' },
  conseilBox: { background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: 10, padding: '11px 14px', fontSize: '0.83rem', color: '#92400E', marginTop: 10, marginBottom: 20 },
  bigCopyZone: { background: '#D8F3DC', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
  bigCopyBtn: { background: '#2D6A4F', color: '#fff', border: 'none', padding: '12px 18px', borderRadius: 9, fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' },
  errorBox: { background: '#FADBD8', border: '1px solid #C0392B', borderRadius: 10, padding: '14px 16px', color: '#C0392B', fontSize: '0.88rem', marginBottom: 16 },
  resetBtn: { display: 'block', margin: '0 auto 16px', background: 'none', border: '1px solid #E8E4DE', color: '#8A8680', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.86rem' },
  tip: { background: '#F0FDF4', border: '1px solid #52B788', borderRadius: 10, padding: '12px 16px', fontSize: '0.8rem', color: '#2D6A4F' },
}
