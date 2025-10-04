// pages/habilidades/[id].js
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReviewModal from '../../src/components/ReviewModal'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// ⭐ mini componente para pintar estrellas
function Stars({ value = 0 }) {
  const filled = Math.round(value)
  return (
    <div className="text-yellow-500 select-none" aria-label={`Puntaje ${value}`}>
      {'★'.repeat(filled)}{'☆'.repeat(5 - filled)}
      <span className="ml-2 text-sm text-slate-500">{Number(value).toFixed(1)}</span>
    </div>
  )
}

export default function Habilidad({ ability }) {
  const router = useRouter()
  const [openReview, setOpenReview] = useState(false)

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Back */}
        <div className="mb-6">
          <Link href="/#cursos" className="text-sm text-slate-600 hover:underline">
            ← Volver a cursos
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow border border-slate-100 dark:border-slate-800 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
                {ability.nombre}
              </h1>
              <div className="mt-2">
                <Stars value={ability.promedio_puntaje || 0} />
              </div>
              <p className="mt-4 text-slate-700 dark:text-slate-300">
                {ability.descripcion || 'Sin descripción'}
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Por: <strong className="text-slate-700 dark:text-slate-200">{ability.user?.name ?? 'Usuario'}</strong>
                <span className="mx-2">•</span>
                Reseñas: <strong>{ability.reviews?.length ?? 0}</strong>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setOpenReview(true)}
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition"
              >
                Dejar reseña
              </button>
              <Link
                href="/#cursos"
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Ver más cursos
              </Link>
            </div>
          </div>
        </div>

        {/* Reseñas */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Reseñas
          </h2>

          {ability.reviews?.length ? (
            <div className="space-y-4">
              {ability.reviews.map(r => (
                <div key={r.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm">
                        {r.user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{r.user?.name ?? 'Usuario'}</p>
                        <div className="text-yellow-500 text-sm">{'★'.repeat(r.puntaje)}{'☆'.repeat(5 - r.puntaje)}</div>
                      </div>
                    </div>
                  </div>
                  {r.comentario && (
                    <p className="mt-3 text-slate-700 dark:text-slate-300">{r.comentario}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 dark:text-slate-400">Aún no hay reseñas.</p>
          )}
        </section>
      </div>

      {/* Modal reseña */}
      <ReviewModal
        open={openReview}
        abilityId={ability.id}
        onClose={() => setOpenReview(false)}
        onOk={() => router.replace(router.asPath)}  // recarga SSR para reflejar la nueva reseña
      />
    </div>
  )
}

export async function getServerSideProps({ params, req }) {
  try {
    const res = await fetch(`${API}/habilidades/${params.id}`, {
      headers: {
        Accept: 'application/json',
        Cookie: req.headers.cookie ?? '',
      },
      cache: 'no-store',
    })
    if (!res.ok) return { notFound: true }
    const ability = await res.json()
    return { props: { ability } }
  } catch {
    return { notFound: true }
  }
}
