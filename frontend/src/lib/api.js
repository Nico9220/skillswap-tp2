import { API } from './auth';

async function getJSON(url) {
  const r = await fetch(url, { credentials: 'include', headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
}

export const validarEmail = (email) =>
  getJSON(`${API}/integraciones/validar-email?email=${encodeURIComponent(email)}`);

export const sugerirHabilidades = (q) =>
  getJSON(`${API}/integraciones/sugerir-habilidades?q=${encodeURIComponent(q)}`);

