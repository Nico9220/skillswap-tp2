import { useState } from 'react'
import { useRouter } from 'next/router'
import { login, logout, currentUser } from '../src/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      const me = await currentUser()
      if (me) router.push('/habilidades')
      else setError('No se pudo obtener la sesión.')
    } catch (err) {
      setError(err.message || 'Error de login')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await logout()
    setError('Sesión cerrada.')
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Ingresar'}</button>
      </form>
      <div style={{ marginTop: 8 }}>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  )
}
