const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'

export default function Habilidad({ ability }) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <a href="/habilidades" className="text-sm text-slate-600">← Volver</a>

      <div className="bg-white p-6 rounded-xl shadow mt-4">
        <h1 className="text-2xl font-bold">{ability.nombre}</h1>
        <p className="mt-2 text-slate-700">{ability.descripcion ?? 'Sin descripción'}</p>
        <div className="mt-2 text-sm text-slate-500">
          Por: <strong>{ability.user?.name ?? 'Usuario'}</strong> · Reseñas: {ability.reviews?.length ?? 0}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {ability.reviews?.length
          ? ability.reviews.map(r => (
              <div key={r.id} className="bg-white p-4 rounded-xl shadow">
                <div className="flex justify-between text-sm">
                  <div>Por <strong>{r.user?.name ?? 'Usuario'}</strong></div>
                  <div>{'★'.repeat(r.puntaje)}{'☆'.repeat(5 - r.puntaje)}</div>
                </div>
                {r.comentario && <p className="mt-2 text-slate-700">{r.comentario}</p>}
              </div>
            ))
          : <p className="text-slate-600">Aún no hay reseñas.</p>}
      </div>
    </section>
  )
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`${API}/habilidades/${params.id}`, { cache: 'no-store' })
  if (!res.ok) return { notFound: true }
  const ability = await res.json()
  return { props: { ability } }
}
