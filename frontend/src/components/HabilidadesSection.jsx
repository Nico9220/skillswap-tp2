'use client';
import { useEffect, useState } from 'react';
import Button from './ui/Button';
import { Card } from './ui/Card';
import Badge from './ui/Badge';
import NewAbilityModal from './NewAbilityModal';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function HabilidadesSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNew, setOpenNew] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/habilidades`, { cache: 'no-store' });
      const data = res.ok ? await res.json() : [];
      setItems(Array.isArray(data) ? data : (data.data ?? []));
    } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  return (
    <section id="habilidades" className="py-20 scroll-mt-24 max-w-7xl mx-auto px-4">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Habilidades
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Cargá tus habilidades y compartilas con la comunidad.
          </p>
        </div>
        <Button onClick={() => setOpenNew(true)}>Agregar</Button>
      </div>

      {loading ? (
        <p>Cargando…</p>
      ) : items.length === 0 ? (
        <Card className="text-center py-14">
          <p className="text-slate-600 dark:text-slate-400">Todavía no hay habilidades.</p>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map(a => (
            <Card key={a.id}>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg">{a.nombre}</h3>
                <Badge>{(a.reviews_count ?? 0)} reseñas</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">
                {a.descripcion ?? 'Sin descripción'}
              </p>
              <a
                href={`/habilidades/${a.id}`}
                className="mt-3 inline-flex text-indigo-600 hover:underline"
              >
                Ver detalle →
              </a>
            </Card>
          ))}
        </div>
      )}

      <NewAbilityModal open={openNew} onClose={() => setOpenNew(false)} onCreated={load} />
    </section>
  );
}
