import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, AlertCircle, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import authService from '../services/authService'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login({ email, password })
      localStorage.setItem('authToken', response.token)
      setUser(response.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el inicio de sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 relative flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-blue-600/40 blur-3xl animate-blob"></div>
        <div className="animation-delay-2000 absolute -bottom-40 left-10 h-[28rem] w-[28rem] rounded-full bg-purple-600/30 blur-3xl animate-blob"></div>
        <div className="animation-delay-4000 absolute top-1/3 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl animate-blob"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_55%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Brand & Value proposition */}
          <div className="text-slate-100">
            <div className="inline-flex items-center rounded-2xl bg-slate-900/70 px-5 py-3 text-sm font-medium tracking-wide text-blue-200 ring-1 ring-white/10 backdrop-blur-md">
              <Shield className="mr-2 h-5 w-5 text-cyan-400" />
              Plataforma Integral de Riesgos
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Controla, visualiza y mitiga riesgos operativos con precisión en tiempo real.
            </h1>
            <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
              Diseñada para equipos de cumplimiento y auditoría. Automatiza el análisis de riesgos, centraliza tus controles y toma decisiones documentadas con indicadores de impacto y probabilidad actualizados.
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <dt className="text-sm text-slate-300">Procesos monitoreados</dt>
                <dd className="mt-2 text-3xl font-bold text-white">+35</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <dt className="text-sm text-slate-300">Controles automatizados</dt>
                <dd className="mt-2 text-3xl font-bold text-white">180</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <dt className="text-sm text-slate-300">Alertas en tiempo real</dt>
                <dd className="mt-2 text-3xl font-bold text-white">24/7</dd>
              </div>
            </dl>
          </div>

          {/* Login Card */}
          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-10 shadow-2xl backdrop-blur-xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-semibold text-white">Accede a tu panel</h2>
              <p className="mt-2 text-sm text-slate-300">Utiliza tus credenciales corporativas para continuar.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-500/15 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-red-300" />
                  <p className="text-sm text-red-100">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@empresa.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-12 pr-12 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-cyan-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:from-slate-500 disabled:via-slate-500 disabled:to-slate-500"
              >
                <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative flex items-center gap-3">
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent"></span>
                      Autenticando...
                    </span>
                  ) : (
                    <>
                      Acceder al sistema
                      <ArrowRight size={18} />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5 text-left text-sm text-cyan-100">
              <p className="mb-3 flex items-center gap-2 font-semibold text-cyan-200">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/30 text-cyan-100">�</span>
                Credenciales de demostración
              </p>
              <div className="space-y-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs uppercase tracking-wide text-cyan-200/80">Admin</p>
                  <p className="mt-1 font-mono text-xs">demo@empresa.com</p>
                  <p className="font-mono text-xs">123456</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs uppercase tracking-wide text-cyan-200/80">Usuario</p>
                  <p className="mt-1 font-mono text-xs">usuario@empresa.com</p>
                  <p className="font-mono text-xs">password123</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs uppercase tracking-wide text-cyan-200/80">Administrador</p>
                  <p className="mt-1 font-mono text-xs">admin@empresa.com</p>
                  <p className="font-mono text-xs">admin123</p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              © 2025 Sistema de Gestión de Riesgos. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
