'use client'
import { useEffect, useState } from 'react'
import ReviewModal from './ReviewModal'
import { currentUser } from '../lib/auth'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export default function CursosSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [me, setMe] = useState(null)
  const [reviewFor, setReviewFor] = useState(null)

  useEffect(() => {
    currentUser().then(setMe).catch(() => setMe(null))
    ;(async () => {
      setLoading(true)
      const res = await fetch(`${API}/habilidades`, { cache: 'no-store' })
      const data = res.ok ? await res.json() : []
      setItems(Array.isArray(data) ? data : (data.data ?? []))
      setLoading(false)
    })()
  }, [])

  return (
    <section id="cursos" className="py-16 scroll-mt-24 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl text-white font-bold mb-6">Cursos</h2>

      {loading ? <p>Cargando…</p> : (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(a => (
            <div key={a.id} className="p-5 rounded-xl shadow bg-white dark:bg-slate-900/70 hover:shadow-md transition">
              <div className="flex justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">{a.nombre}</h3>
                <span className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                  {(a.reviews_count ?? 0)} reseñas
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{a.descripcion ?? 'Sin descripción'}</p>
              <div className="mt-3 flex items-center gap-3">
                <a href={`/habilidades/${a.id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">Ver</a>

                {me ? (
                  <button onClick={() => setReviewFor(a.id)} className="text-slate-700 dark:text-slate-200 underline">
                    Reseñar
                  </button>
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400">Iniciá sesión para reseñar</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ReviewModal
        open={!!reviewFor}
        abilityId={reviewFor}
        onClose={() => setReviewFor(null)}
        onOk={() => {
          setReviewFor(null)
          // si querés refrescar contadores tras reseña:
          // window.location.hash = '#cursos'; window.location.reload()
        }}
      />
    </section>
  )
}
