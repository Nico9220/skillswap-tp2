'use client'
import { useEffect, useState } from 'react'
import NewAbilityModal from './NewAbilityModal'
import { currentUser } from '../lib/auth'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export default function HabilidadesSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [openNew, setOpenNew] = useState(false)
  const [me, setMe] = useState(null)

  async function load(mine = false) {
    setLoading(true)
    const url = mine ? `${API}/habilidades?mine=1` : `${API}/habilidades`
    const res = await fetch(url, {
      cache: 'no-store',
      credentials: mine ? 'include' : 'same-origin'
    })
    const data = res.ok ? await res.json() : []
    setItems(Array.isArray(data) ? data : (data.data ?? []))
    setLoading(false)
  }

  useEffect(() => {
    currentUser().then(u => {
      setMe(u)
      load(!!u)   // si hay sesión => mis habilidades; sino => vacío
    }).catch(() => {
      setMe(null)
      setItems([]); setLoading(false)
    })
  }, [])

  return (
    <section id="habilidades" className="py-16 scroll-mt-24 max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-white font-bold">Mis habilidades</h2>
        {me && (
          <button onClick={() => setOpenNew(true)}
            className="rounded-md text-white border px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-slate-800">
            Agregar
          </button>
        )}
      </div>

      {!me && (
        <div className="rounded-xl border border-dashed border-slate-300/70 dark:border-white/15 p-8 text-center mb-6">
          <p className="text-slate-600 dark:text-slate-300">
            Iniciá sesión para ver y administrar tus habilidades.
          </p>
        </div>
      )}

      {me && (loading ? <p>Cargando…</p> : (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(a => (
            <div key={a.id} className="p-5 rounded-xl shadow bg-white dark:bg-slate-900/70">
              <div className="flex justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">{a.nombre}</h3>
                <span className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                  {(a.reviews_count ?? 0)} reseñas
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{a.descripcion ?? 'Sin descripción'}</p>
              <a href={`/habilidades/${a.id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline mt-2 inline-block">
                Ver detalle →
              </a>
            </div>
          ))}
          {items.length === 0 && <p>No tenés habilidades aún.</p>}
        </div>
      ))}

      <NewAbilityModal open={openNew} onClose={() => setOpenNew(false)} onCreated={() => load(true)} />
    </section>
  )
}
