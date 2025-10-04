'use client';
import { useEffect, useState } from 'react';
import { Card } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import ReviewModal from './ReviewModal';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function CursosSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewFor, setReviewFor] = useState(null);

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
    <section id="cursos" className="py-20 scroll-mt-24 max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Cursos
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Explorá y dejá tu reseña.</p>
      </div>

      {loading ? (
        <p>Cargando…</p>
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
              <div className="mt-4 flex gap-3">
                <a href={`/habilidades/${a.id}`} className="text-indigo-600 hover:underline">
                  Ver
                </a>
                <Button variant="outline" size="sm" onClick={() => setReviewFor(a.id)}>
                  Reseñar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ReviewModal
        open={!!reviewFor}
        abilityId={reviewFor}
        onClose={() => setReviewFor(null)}
        onOk={load}
      />
    </section>
  );
}
