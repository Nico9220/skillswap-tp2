'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import Button from './ui/Button';
import { Input, Label } from './ui/Input';
import { login, register } from '../lib/auth';
import { validarEmail } from '../lib/api';

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

export default function AuthModal({ open, onClose, mode = 'login' }) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [confirm, setConfirm] = useState('password');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [emailState, setEmailState] = useState('idle');
  const [emailError, setEmailError] = useState(null);

  // Chequeo rápido de contraseña en el front 
  function weakPwdMessage(pwd) {
    const p = String(pwd);
    if (p.length < 8) return 'Usá 8+ caracteres.';
    const comunes = ['password', 'password1', 'password123', '123456', '12345678', 'qwerty'];
    if (comunes.includes(p.toLowerCase())) return 'Contraseña demasiado común.';
    return null;
  }

  async function onEmailBlur(e) {
    const em = e.target.value.trim();

    // Solo validamos en REGISTRO y si hay algo escrito
    if (mode !== 'register' || !em) return;

    // 1) Formato antes de llamar a la API
    if (!EMAIL_RX.test(em)) {
      setEmailError('Formato de email inválido.');
      setEmailState('bad');
      return;
    }

    // 2) Validación contra nuestra API (dominio desechable)
    try {
      setEmailState('checking');
      setEmailError(null);

      const r = await validarEmail(em); // { mx_found, final_disposable, ... }

      if (!r.mx_found || r.final_disposable) {
        setEmailError('Este correo parece desechable o inválido.');
        setEmailState('bad');
      } else {
        setEmailError(null);
        setEmailState('ok');
      }
    } catch {
      // Si la API no responde, no marcamos OK: queda "error" (no validado ahora)
      setEmailError(null);
      setEmailState('error');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        setLoading(true);
        await login(email, password);
      } else {
        // Validaciones de front para UX
        const weakMsg = weakPwdMessage(password);
        if (weakMsg) throw new Error(weakMsg);
        if (password !== confirm) throw new Error('Las contraseñas no coinciden.');
        if (emailState === 'bad') throw new Error(emailError || 'Email inválido.');
        // Si sigue "checking", mejor esperar / no enviar
        if (emailState === 'checking') throw new Error('Esperá a que se valide el email…');

        setLoading(true);
        await register(name, email, password, confirm);
      }

      onClose();
      router.push('/#habilidades');
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}>
      {error && (
        <div className="mb-3 text-sm rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 dark:bg-rose-950/30 dark:border-rose-900">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === 'register' && (
          <div>
            <Label className="text-gray-100" htmlFor="name">Nombre</Label>
            <Input
              className="text-gray-100"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <Label className="text-gray-100" htmlFor="email">Email</Label>
          <Input
            className="text-gray-400"
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (mode === 'register') { setEmailError(null); setEmailState('idle'); }
            }}
            onBlur={onEmailBlur}
            required
          />
          {mode === 'register' && (
            <p className="mt-1 text-xs">
              {emailState === 'checking' && <span className="text-slate-400">Verificando email…</span>}
              {emailState === 'bad' && <span className="text-rose-400">{emailError}</span>}
              {emailState === 'ok' && <span className="text-emerald-400">Email OK</span>}
              {emailState === 'error' && <span className="text-slate-400">No se pudo validar ahora.</span>}
            </p>
          )}
        </div>

        <div>
          <Label className="text-gray-100" htmlFor="pass">Contraseña</Label>
          <Input
            className="text-gray-400"
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {mode === 'register' && (
            <p className="mt-1 text-xs text-slate-400">
              Sugerencia: 12+ caracteres, mezcla de mayúsculas, minúsculas y símbolos.
            </p>
          )}
        </div>

        {mode === 'register' && (
          <div>
            <Label className="text-gray-100" htmlFor="confirm">Confirmar contraseña</Label>
            <Input
              className="text-gray-400"
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={
            loading ||
            (mode === 'register' && (emailState === 'checking' || emailState === 'bad'))
          }
          className="w-full"
        >
          {loading ? 'Enviando…' : (mode === 'login' ? 'Ingresar' : 'Registrarse')}
        </Button>
      </form>
    </Modal>
  );
}
