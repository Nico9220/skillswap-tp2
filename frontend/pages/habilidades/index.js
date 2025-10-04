import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'

export default function Habilidades({ items }) {
  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Habilidades</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map(a => (
          <div key={a.id} className="p-5 rounded-xl shadow bg-white">
            <div className="flex justify-between">
              <h3 className="font-semibold">{a.nombre}</h3>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                {(a.reviews_count ?? 0)} reseñas
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {a.descripcion ?? 'Sin descripción'}
            </p>
            <div className="mt-3">
              <Link href={`/habilidades/${a.id}`} className="text-indigo-600 hover:underline">
                Ver detalle →
              </Link>
            </div>
          </div>
        ))}

        {items.length === 0 && <p>No hay habilidades.</p>}
      </div>
    </section>
  )
}

export async function getServerSideProps(ctx) {
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'

  const res = await fetch(`${API}/habilidades`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      Cookie: ctx.req.headers.cookie ?? '',
    },
  })

  if (!res.ok) return { props: { items: [] } }

  const data = await res.json()
  const items = Array.isArray(data) ? data : (data.data ?? [])
  return { props: { items } }
}

