export const APP = 'http://localhost:8000'
export const API = 'http://localhost:8000/api'

// helpers cookie CSRF
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
  const res = await fetch(`${APP}/spa/login`, {     // 👈 nuevo endpoint
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': xsrf(),
    },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    let msg = `Error ${res.status}`
    try { const d = await res.json(); if (d?.message) msg = d.message } catch {}
    throw new Error(msg)
  }
  return true
}

export async function logout() {
  await fetch(`${APP}/spa/logout`, {               // 👈 nuevo endpoint
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
  const res = await fetch(`${API}/user`, {
    credentials: 'include',
    headers: { 'Accept': 'application/json' },
  })
  if (!res.ok) return null
  return res.json()
}
