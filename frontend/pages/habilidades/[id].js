import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReviewModal from '../../src/components/ReviewModal'   // ajustá la ruta si es distinto

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

function Stars({ value = 0 }) {
  const rounded = Math.round(Number(value) || 0)
  return (
    <div className="flex items-center gap-1" aria-label={`Puntaje ${value} de 5`}>
      {[1, 2, 3, 4, 5].map(n => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 ${n <= rounded ? 'text-amber-400' : 'text-slate-500'}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.034a1 1 0 00-1.175 0l-2.803 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-slate-400">{Number(value).toFixed(1)}</span>
    </div>
  )
}

export default function Habilidad({ ability }) {
  const router = useRouter()
  const [openReview, setOpenReview] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/#cursos" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
          ← Volver a cursos
        </Link>

        {/* Card principal */}
        <div className="mt-4 rounded-2xl bg-white/90 dark:bg-slate-900/70 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
          <div className="p-6 md:p-8 flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {ability.nombre}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Stars value={ability.promedio_puntaje ?? 0} />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Por <span className="font-medium text-slate-900 dark:text-slate-200">{ability.user?.name ?? 'Usuario'}</span>
                  {' • '}Reseñas: {ability.reviews?.length ?? 0}
                </span>
              </div>

              {ability.descripcion && (
                <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {ability.descripcion}
                </p>
              )}
            </div>

            <div className="shrink-0 space-x-2">
              <button
                onClick={() => setOpenReview(true)}
                className="inline-flex items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                Dejar reseña
              </button>
              <Link
                href="/#cursos"
                className="inline-flex items-center rounded-lg border border-slate-300/60 dark:border-white/20 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50/80 dark:hover:bg-white/5"
              >
                Ver más cursos
              </Link>
            </div>
          </div>
        </div>

        {/* Reseñas */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Reseñas</h2>

          {ability.reviews?.length ? (
            <ul className="mt-4 space-y-3">
              {ability.reviews.map(r => (
                <li
                  key={r.id}
                  className="rounded-xl bg-white/90 dark:bg-slate-900/70 p-5 shadow ring-1 ring-black/5 dark:ring-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Por <span className="font-medium text-slate-900 dark:text-slate-200">{r.user?.name ?? 'Usuario'}</span>
                    </div>
                    <Stars value={r.puntaje} />
                  </div>
                  {r.comentario && (
                    <p className="mt-3 text-slate-700 dark:text-slate-300">{r.comentario}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300/70 dark:border-white/15 p-8 text-center">
              <p className="text-slate-600 dark:text-slate-300">Aún no hay reseñas.</p>
              <button
                onClick={() => setOpenReview(true)}
                className="mt-4 inline-flex items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                Escribir la primera
              </button>
            </div>
          )}
        </section>
      </div>

      <ReviewModal
        open={openReview}
        abilityId={ability.id}
        onClose={() => setOpenReview(false)}
        onOk={() => {
          setOpenReview(false)
          router.replace(router.asPath) // refresca SSR sin parpadear
        }}
      />
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`${API}/habilidades/${params.id}`, { cache: 'no-store' })
  if (!res.ok) return { notFound: true }
  const ability = await res.json()
  return { props: { ability } }
}
