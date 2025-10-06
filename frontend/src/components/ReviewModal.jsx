'use client';
import { useState } from 'react';
import Modal from './Modal';
import Button from './ui/Button';
import { Textarea } from './ui/Input';
import { API, csrf } from '../lib/auth';

function xsrf() {
  const raw = document.cookie.split('; ').find(r=>r.startsWith('XSRF-TOKEN='))?.split('=')[1];
  return raw ? decodeURIComponent(raw) : '';
}

export default function ReviewModal({ open, onClose, abilityId, onOk }) {
  const [puntaje, setPuntaje] = useState(5);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await csrf();
      const res = await fetch(`${API}/reseñas`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrf(),
        },
        body: JSON.stringify({ ability_id: abilityId, puntaje, comentario })
      });
      if (!res.ok){
        const errorData = await res.json(); //leo el mensaje del backend
        throw new Error(errorData.message || 'No se pudo enviar la reseña');

      } 
      setComentario(''); setPuntaje(5);
      onOk?.(); onClose();
    } catch (e) { setError(e.message || 'Error'); }
    finally { setLoading(false); }
  }

  return (
    <Modal open={open} onClose={onClose} title="Dejar reseña">
      {error && <div className="mb-3 text-sm rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 dark:bg-rose-950/30 dark:border-rose-900">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-white">Puntaje</span>
          <select
            className="rounded-xl text-white border px-2 py-1 bg-white/90 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={puntaje}
            onChange={(e)=>setPuntaje(Number(e.target.value))}
          >
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <Textarea placeholder="Comentario…" value={comentario} onChange={(e)=>setComentario(e.target.value)} />
        <Button disabled={loading} className="w-full">{loading ? 'Enviando…' : 'Enviar'}</Button>
      </form>
    </Modal>
  );
}
