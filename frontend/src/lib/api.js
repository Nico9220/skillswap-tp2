export const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'

export async function apiGet(path) {
  const res = await fetch(`${API}${path}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`)
  return res.json()
}

