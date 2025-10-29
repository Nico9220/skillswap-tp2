// src/components/NewAbilityModal.jsx
'use client';
import { useState } from 'react';
import Modal from './Modal';
import Button from './ui/Button';
import { Textarea } from './ui/Input';
import AbilityInput from './AbilityInput';
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
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (!nombre.trim()) throw new Error('Ingresá un nombre de habilidad.');
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
        body: JSON.stringify({ nombre: nombre.trim(), descripcion: descripcion || null })
      });
      if (!res.ok) {
        let msg = 'No se pudo crear la habilidad';
        try { const d = await res.json(); msg = d.message || msg; } catch {}
        throw new Error(msg);
      }
      setNombre(''); setDescripcion('');
      onCreated?.(); onClose?.();
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Agregar habilidad">
      {error && (
        <div className="mb-3 text-sm rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 dark:bg-rose-950/30 dark:border-rose-900">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1 text-white">Nombre</label>
          <AbilityInput
            value={nombre}
            onChange={setNombre}
            onSelect={(w) => setNombre(w)}
            placeholder="Ej: Java, React, Excel…"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-white">Descripción (opcional)</label>
          <Textarea
            className="text-white"
            value={descripcion}
            onChange={(e)=>setDescripcion(e.target.value)}
            placeholder="Comentá experiencia, nivel, etc."
          />
        </div>

        <Button disabled={loading} className="w-full">
          {loading ? 'Guardando…' : 'Guardar'}
        </Button>
      </form>
    </Modal>
  );
}
