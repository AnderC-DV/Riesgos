import { Shield } from 'lucide-react'
import LoginCard from '../components/auth/LoginCard'

export default function LoginPage() {

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
          <LoginCard />
        </div>
      </div>
    </div>
  )
}
