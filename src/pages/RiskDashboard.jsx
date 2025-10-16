import { TrendingUp, AlertTriangle, CheckCircle, Clock, Activity, BarChart3 } from 'lucide-react'

export default function RiskDashboard() {
  // Datos simulados - será reemplazado con datos reales del backend
  const stats = [
    {
      title: 'Riesgos Identificados',
      value: '24',
      change: '+3 este mes',
      icon: AlertTriangle,
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Controles Activos',
      value: '18',
      change: '+2 activados',
      icon: CheckCircle,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Activos Monitoreados',
      value: '42',
      change: '+5 nuevos',
      icon: Activity,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Tareas Pendientes',
      value: '7',
      change: '-1 completada',
      icon: Clock,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Dashboard de Riesgos</h1>
          <p className="text-gray-600 mt-2 text-lg">Visualización general y estado actual del sistema</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
          <BarChart3 size={20} />
          Generar Reporte
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${stat.textColor} bg-white`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-semibold mb-1">{stat.title}</h3>
              <p className={`text-3xl font-black ${stat.textColor}`}>{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Map Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Mapa de Riesgos</h2>
              <p className="text-gray-500 text-sm mt-1">Matriz de Probabilidad × Impacto</p>
            </div>
            <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>

          {/* Risk Matrix Placeholder */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-96 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Matriz Interactiva de Riesgos</h3>
              <p className="text-gray-600 mb-4">Se cargará desde el backend</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold">
                Cargar Datos
              </button>
            </div>
          </div>

          {/* Risk Legend */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-700">Bajo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-700">Moderado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700">Alto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-700">Crítico</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            {[
              { title: 'Riesgo identificado', desc: 'Vulnerabilidad de seguridad', time: 'Hace 2h', color: 'bg-red-100', textColor: 'text-red-600' },
              { title: 'Control implementado', desc: 'Validación de accesos', time: 'Hace 5h', color: 'bg-green-100', textColor: 'text-green-600' },
              { title: 'Activo agregado', desc: 'Servidor web-01', time: 'Hace 1 día', color: 'bg-blue-100', textColor: 'text-blue-600' },
              { title: 'Reporte generado', desc: 'Auditoría mensual', time: 'Hace 2 días', color: 'bg-purple-100', textColor: 'text-purple-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-10 h-10 ${item.color} rounded-lg flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-gray-600 text-xs mt-0.5 truncate">{item.desc}</p>
                  <p className="text-gray-400 text-xs mt-2">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
          <AlertTriangle className="w-8 h-8 mb-3 opacity-90" />
          <h3 className="text-lg font-bold mb-2">Nuevos Riesgos</h3>
          <p className="text-blue-100 text-sm mb-4">Revisa los riesgos recientemente identificados</p>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold text-sm transition-colors">
            Ver Todos →
          </button>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
          <CheckCircle className="w-8 h-8 mb-3 opacity-90" />
          <h3 className="text-lg font-bold mb-2">Controles Pendientes</h3>
          <p className="text-emerald-100 text-sm mb-4">7 controles requieren revisión</p>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold text-sm transition-colors">
            Revisar →
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
          <BarChart3 className="w-8 h-8 mb-3 opacity-90" />
          <h3 className="text-lg font-bold mb-2">Generar Reporte</h3>
          <p className="text-purple-100 text-sm mb-4">Exporta datos en PDF o Excel</p>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold text-sm transition-colors">
            Exportar →
          </button>
        </div>
      </div>
    </div>
  )
}
