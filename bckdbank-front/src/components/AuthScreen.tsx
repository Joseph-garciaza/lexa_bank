import { useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check, LoaderCircle, ShieldCheck } from 'lucide-react'
import type { AuthMode } from '../types/auth'
import BrandMark from './BrandMark'

interface AuthScreenProps {
  onAuthenticate: (mode: AuthMode, values: Record<string, string>) => Promise<void>
  message: string
}

export default function AuthScreen({ onAuthenticate, message }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setFormError('')
    const values = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>

    try {
      await onAuthenticate(mode, values)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'No fue posible completar la solicitud.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-art" aria-label="Lexa Bank">
        <a className="brand brand-on-dark" href="#login">
          <BrandMark />
        </a>
        <div className="auth-art-copy">
          <span className="eyebrow">TU DINERO, BAJO TU CONTROL</span>
          <h1>Tu futuro financiero<br />comienza aquí<span>.</span></h1>
          <p>Administra tu dinero, realiza transferencias y consulta tus movimientos desde un solo lugar.</p>
        </div>
        <div className="auth-visual" aria-hidden="true">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-card visual-card-back">
            <span className="visual-card-brand">Lexa Bank</span>
            <span className="visual-card-chip" />
          </div>
          <div className="visual-card visual-card-front">
            <span className="visual-card-label">TU EXPERIENCIA LEXA</span>
            <strong>$ 8.420,50</strong>
            <span className="visual-card-bottom">
              <span>•••• 2846</span><span className="card-circles"><i /><i /></span>
            </span>
          </div>
          <div className="visual-float float-arrow"><ArrowUpRight size={19} /></div>
          <div className="visual-float float-check"><Check size={17} /></div>
        </div>
        <div className="auth-art-foot"><span>CONTROL TOTAL. FINANZAS INTELIGENTES.</span><span>LEXA BANK</span></div>
      </section>
      <section className="auth-side" id="login">
        <div className="auth-mobile-brand">
          <BrandMark />
        </div>
        <div className="auth-form-wrap">
          <div className="auth-intro">
            <span className="eyebrow">ÁREA PERSONAL</span>
            <h2>{mode === 'login' ? 'Bienvenido a Lexa Bank' : 'Empecemos.'}</h2>
            <p>{mode === 'login' ? 'Tu dinero, tus decisiones. Una experiencia bancaria más inteligente.' : 'Crea tu acceso y abre tu primera cuenta.'}</p>
          </div>
          <div className="auth-tabs" role="tablist" aria-label="Acceso a la cuenta">
            <button
              className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
              onClick={() => { setMode('login'); setFormError('') }}
              role="tab"
              aria-selected={mode === 'login'}
            >
              Iniciar sesión
            </button>
            <button
              className={mode === 'register' ? 'auth-tab active' : 'auth-tab'}
              onClick={() => { setMode('register'); setFormError('') }}
              role="tab"
              aria-selected={mode === 'register'}
            >
              Crear cuenta
            </button>
          </div>
          <form className="auth-form" onSubmit={submit}>
            {mode === 'register' && (
              <div className="name-fields">
                <label>Nombre<input name="firstName" autoComplete="given-name" required placeholder="Tu nombre" /></label>
                <label>Apellido<input name="lastName" autoComplete="family-name" required placeholder="Tu apellido" /></label>
              </div>
            )}
            <label>Correo electrónico<input name="email" type="email" autoComplete="email" required placeholder="nombre@correo.com" /></label>
            <label>
              Contraseña
              <input
                name="password"
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={6}
                required
                placeholder={mode === 'login' ? 'Tu contraseña' : 'Mínimo 6 caracteres'}
              />
            </label>
            {(formError || message) && <div className="alert alert-error" role="alert">{formError || message}</div>}
            <button className="primary-button auth-submit" type="submit" disabled={busy}>
              {busy
                ? <LoaderCircle className="spin" size={18} />
                : <>{mode === 'login' ? 'Iniciar sesión' : 'Crear mi cuenta'}<ArrowRight size={17} /></>}
            </button>
          </form>
          <div className="auth-assurance"><ShieldCheck size={17} /><span>Tus datos viajan protegidos y cifrados.</span></div>
        </div>
        <footer className="auth-footer"><span>© 2026 Lexa Bank</span><span>Entorno de demostración</span></footer>
      </section>
    </main>
  )
}
