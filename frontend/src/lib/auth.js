// src/lib/auth.js
export const APP = 'http://localhost:8000'
export const API = 'http://localhost:8000/api'

function getCookie(name) {
  if (typeof document === 'undefined') return ''
  return document.cookie.split('; ')
    .find(r => r.startsWith(name + '='))?.split('=')[1] || ''
}
function xsrf() {
  const raw = getCookie('XSRF-TOKEN')
  return raw ? decodeURIComponent(raw) : ''
}
export async function csrf() {
  await fetch(`${APP}/sanctum/csrf-cookie`, { credentials: 'include' })
}

export async function login(email, password) {
  await csrf()
  const res = await fetch(`${APP}/spa/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': xsrf(),
    },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Credenciales inválidas')
}

export async function register(name, email, password, password_confirmation) {
  await csrf()
  const res = await fetch(`${APP}/spa/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': xsrf(),
    },
    body: JSON.stringify({ name, email, password, password_confirmation })
  })
  if (!res.ok) {
    let msg = 'No se pudo registrar'
    try { const d = await res.json(); msg = d.message || msg } catch {}
    throw new Error(msg)
  }
}

export async function logout() {
  await fetch(`${APP}/spa/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': xsrf(),
    },
  })
}

export async function currentUser() {
  try {
    const res = await fetch(`${API}/session`, {
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.user ?? null
  } catch {
    return null
  }
}

