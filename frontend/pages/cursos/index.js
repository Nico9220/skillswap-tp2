const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export default function Cursos({ items }) {
  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Cursos</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(a => (
          <a key={a.id} href={`/habilidades/${a.id}`} className="block p-5 rounded-xl shadow bg-white hover:shadow-md transition">
            <div className="flex justify-between">
              <h3 className="font-semibold">{a.nombre}</h3>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                {(a.reviews_count ?? 0)} reseñas
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{a.descripcion ?? 'Sin descripción'}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API}/habilidades`, { cache: 'no-store' })
  const data = res.ok ? await res.json() : []
  const items = Array.isArray(data) ? data : (data.data ?? [])
  return { props: { items } }
}
