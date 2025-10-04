'use client';
import { useState } from 'react';
import Modal from './Modal';
import Button from './ui/Button';
import { Input, Label, Textarea } from './ui/Input';
import { API, csrf } from '../lib/auth';

function xsrf() {
  const raw = document.cookie.split('; ').find(r=>r.startsWith('XSRF-TOKEN='))?.split('=')[1];
  return raw ? decodeURIComponent(raw) : '';
}

export default function NewAbilityModal({ open, onClose, onCreated }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await csrf();
      const res = await fetch(`${API}/habilidades`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrf(),
        },
        body: JSON.stringify({ nombre, descripcion })
      });
      if (!res.ok) throw new Error('No se pudo crear');
      setNombre(''); setDescripcion('');
      onCreated?.(); onClose();
    } catch (e) { setError(e.message || 'Error'); }
    finally { setLoading(false); }
  }

  return (
    <Modal open={open} onClose={onClose} title="Nueva habilidad">
      {error && <div className="mb-3 text-sm rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 dark:bg-rose-950/30 dark:border-rose-900">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div>
          <Label htmlFor="n">Nombre</Label>
          <Input id="n" value={nombre} onChange={(e)=>setNombre(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="d">Descripción</Label>
          <Textarea id="d" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)} />
        </div>
        <Button disabled={loading} className="w-full">{loading ? 'Guardando…' : 'Guardar'}</Button>
      </form>
    </Modal>
  );
}
