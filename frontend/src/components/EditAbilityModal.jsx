'use client'
import { useState, useEffect } from 'react'
import Modal from './Modal'
import { API, csrf } from '../lib/auth'

function xsrf() {
  const raw = document.cookie.split('; ').find(r=>r.startsWith('XSRF-TOKEN='))?.split('=')[1]
  return raw ? decodeURIComponent(raw) : ''
}

export default function EditAbilityModal({ open, onClose, ability, onSaved }) {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (ability) {
      setNombre(ability.nombre || '')
      setDescripcion(ability.descripcion || '')
    }
  }, [ability])

  async function submit(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await csrf()
      const res = await fetch(`${API}/habilidades/${ability.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrf(),
        },
        body: JSON.stringify({ nombre, descripcion })
      })
      if (!res.ok) {
        if (res.status === 422) {
          const body = await res.json().catch(()=>({}))
          const first = body?.errors && Object.values(body.errors)[0]?.[0]
          throw new Error(first || 'No se pudo guardar')
        }
        throw new Error('No se pudo guardar')
      }
      onSaved?.()
      onClose()
    } catch (e) {
      setError(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Editar habilidad</h2>
      {error && <p className="text-rose-500 text-sm mb-2">{error}</p>}
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input className="w-full rounded-md border px-3 py-2"
                 value={nombre} onChange={e=>setNombre(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Descripción</label>
          <textarea className="w-full rounded-md border px-3 py-2"
                    value={descripcion} onChange={e=>setDescripcion(e.target.value)} />
        </div>
        <button disabled={loading} className="rounded-md bg-black text-white px-4 py-2">
          {loading ? 'Guardando…' : 'Guardar'}
        </button>
      </form>
    </Modal>
  )
}
