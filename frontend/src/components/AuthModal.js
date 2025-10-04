'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import Button from './ui/Button';
import { Input, Label } from './ui/Input';
import { login, register } from '../lib/auth';

export default function AuthModal({ open, onClose, mode = 'login' }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [confirm, setConfirm] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (mode === 'login') await login(email, password);
      else await register(name, email, password, confirm);
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
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} required />
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="pass">Contraseña</Label>
          <Input id="pass" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        {mode === 'register' && (
          <div>
            <Label htmlFor="confirm">Confirmar contraseña</Label>
            <Input id="confirm" type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required />
          </div>
        )}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Enviando…' : (mode === 'login' ? 'Ingresar' : 'Registrarse')}
        </Button>
      </form>
    </Modal>
  );
}
