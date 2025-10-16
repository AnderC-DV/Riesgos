import { Plus, Filter, Search, AlertTriangle, TrendingDown, TrendingUp, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function RiskAnalysis() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')

  // Datos simulados - será reemplazado con datos del backend
  const risks = [
    {
      id: 1,
      title: 'Falla en sistema de autenticación',
      description: 'Vulnerabilidad potencial en el módulo de login',
      level: 'alto',
      probability: 'media',
      impact: 'alta',
      status: 'en-revisión',
      owner: 'Juan García',
      date: '2025-10-15'
    },
    {
      id: 2,
      title: 'Pérdida de datos en backup',
      description: 'Riesgo de fallos en el sistema de respaldo',
      level: 'crítico',
      probability: 'baja',
      impact: 'crítica',
      status: 'activo',
      owner: 'María López',
      date: '2025-10-12'
    },
    {
      id: 3,
      title: 'Acceso no autorizado a datos sensibles',
      description: 'Control de accesos insuficiente',
      level: 'alto',
      probability: 'media',
      impact: 'alta',
      status: 'mitigado',
      owner: 'Carlos Rodríguez',
      date: '2025-10-10'
    },
  ]

  const getLevelColor = (level) => {
    const colors = {
      bajo: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100' },
      moderado: { bg: 'bg-yellow-50', text: 'text-yellow-700', badge: 'bg-yellow-100' },
      alto: { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100' },
      crítico: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100' },
    }
    return colors[level] || colors.moderado
  }

  const getStatusBadge = (status) => {
    const statuses = {
      'en-revisión': { text: 'En Revisión', color: 'bg-blue-100 text-blue-700' },
      'activo': { text: 'Activo', color: 'bg-red-100 text-red-700' },
      'mitigado': { text: 'Mitigado', color: 'bg-green-100 text-green-700' },
      'controlado': { text: 'Controlado', color: 'bg-purple-100 text-purple-700' },
    }
    return statuses[status] || statuses['en-revisión']
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-gray-900">Análisis de Riesgos</h1>
        <p className="text-gray-600 mt-2 text-lg">Identificación, evaluación y tratamiento de riesgos operativos</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1 md:max-w-2xl">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar riesgos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          >
            <option value="all">Todos los niveles</option>
            <option value="bajo">Bajo</option>
            <option value="moderado">Moderado</option>
            <option value="alto">Alto</option>
            <option value="crítico">Crítico</option>
          </select>
        </div>

        {/* Create Button */}
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap">
          <Plus size={20} />
          Nuevo Riesgo
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-sm font-semibold mb-1">Total Riesgos</p>
          <p className="text-3xl font-black text-gray-900">24</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-sm font-semibold mb-1">Críticos</p>
          <p className="text-3xl font-black text-red-600">3</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-sm font-semibold mb-1">Mitigados</p>
          <p className="text-3xl font-black text-green-600">15</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-sm font-semibold mb-1">En Proceso</p>
          <p className="text-3xl font-black text-blue-600">6</p>
        </div>
      </div>

      {/* Risk List */}
      <div className="space-y-4">
        {risks.length > 0 ? (
          risks.map((risk) => {
            const levelColors = getLevelColor(risk.level)
            const statusBadge = getStatusBadge(risk.status)
            return (
              <div
                key={risk.id}
                className={`${levelColors.bg} rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all cursor-pointer transform hover:scale-102 group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${levelColors.badge} mt-1`}>
                      <AlertTriangle className={`w-5 h-5 ${levelColors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${levelColors.text} mb-1 group-hover:underline`}>
                        {risk.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{risk.description}</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusBadge.color}`}>
                          {statusBadge.text}
                        </span>
                        <span className="text-xs text-gray-500">Probabilidad: {risk.probability}</span>
                        <span className="text-xs text-gray-500">Impacto: {risk.impact}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-6 h-6 ${levelColors.text} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                  <span>Responsable: <strong>{risk.owner}</strong></span>
                  <span>{new Date(risk.date).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
            )
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-300 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-gray-900 font-semibold mb-2">No hay riesgos registrados</h3>
            <p className="text-gray-600 mb-6">Los riesgos se cargarán desde el backend</p>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all">
              Crear Primer Riesgo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
