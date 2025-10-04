import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { API, APP, csrf } from '../../src/lib/auth'

function xsrf() {
  const raw = document.cookie.split('; ').find(r=>r.startsWith('XSRF-TOKEN='))?.split('=')[1]
  return raw ? decodeURIComponent(raw) : ''
}

export default function NuevaHabilidad() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await csrf()
      const res = await fetch(`${API}/habilidades`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrf(),
        },
        body: JSON.stringify({ nombre, descripcion }),
      })
      if (!res.ok) throw new Error('No se pudo crear')
      const created = await res.json()
      router.push(`/habilidades/${created.id}`)
    } catch (err) {
      setError(err.message || 'Error')
    }
  }

  return (
    <section className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Nueva habilidad</h1>
      {error && <p className="text-rose-500 mb-3">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input className="w-full rounded-md border px-3 py-2" value={nombre} onChange={e=>setNombre(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Descripción</label>
          <textarea className="w-full rounded-md border px-3 py-2" value={descripcion} onChange={e=>setDescripcion(e.target.value)} />
        </div>
        <button className="rounded-md bg-black text-white px-4 py-2">Guardar</button>
      </form>
    </section>
  )
}
