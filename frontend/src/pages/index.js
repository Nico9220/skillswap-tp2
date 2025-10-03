import Link from 'next/link'
import { apiGet } from '../../src/lib/api'

export default function HabilidadesPage({ items }) {
  return (
    <section id="habilidades" className="py-12">
      <div className="max-w-xl px-4 py-12 mx-auto sm:px-6 lg:max-w-6xl lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-center">Habilidades</h1>

        {items.length === 0 && (
          <p className="text-center text-slate-600">Aún no hay habilidades.</p>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((a) => (
            <div key={a.id} className="p-5 mb-6 space-y-4 border shadow rounded-2xl">
              <h3 className="text-lg font-semibold">{a.nombre}</h3>
              <p className="text-sm text-slate-600">{a.descripcion ?? 'Sin descripción'}</p>

              <div className="flex justify-between text-xs text-slate-500">
                <span>Reseñas: {a.reviews_count ?? 0}</span>
                <Link
                  href={`/habilidades/${a.id}`}
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  Ver detalle →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// SSR: evitamos CORS y usamos el back local
export async function getServerSideProps() {
  const data = await apiGet('/habilidades')      // devuelve { data, meta, links }
  return { props: { items: data.data ?? [] } }
}
