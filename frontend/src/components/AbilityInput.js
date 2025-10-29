// src/components/AbilityInput.jsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { sugerirHabilidades } from '../lib/api';

export default function AbilityInput({ value, onChange, onSelect, placeholder='Ej: Java, JavaScript…' }) {
  const [q, setQ] = useState(value || '');
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const t = useRef(null);

  useEffect(() => setQ(value || ''), [value]);

  useEffect(() => {
    clearTimeout(t.current);
    if (!q.trim()) { setItems([]); setOpen(false); return; }
    t.current = setTimeout(async () => {
      try {
        const list = await sugerirHabilidades(q);
        setItems(list || []);
        setOpen(true);
      } catch {
        setItems([]); setOpen(false);
      }
    }, 250);
    return () => clearTimeout(t.current);
  }, [q]);

  useEffect(() => {
    const onDoc = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div ref={box} className="relative">
      <input
        className="w-full rounded-xl border px-3 py-2 bg-white/90 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
        value={q}
        onChange={e => { setQ(e.target.value); onChange?.(e.target.value); }}
        placeholder={placeholder}
        autoComplete="off"
      />
      {open && items.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full max-h-56 overflow-auto rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow">
          {items.map((w, i) => (
            <li key={i}
                className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-800 dark:text-slate-100"
                onMouseDown={() => { onSelect?.(w); setQ(w); setOpen(false); }}>
              {w}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
