import {
  Plus,
  Search,
  AlertTriangle,
  ChevronRight,
  CheckCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import RiskWizardModal from '../components/RiskWizardModal'
import { useRiskStore } from '../store/riskStore'
import { useAuthStore } from '../store/authStore'

const LEVEL_STYLES = {
  bajo: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100' },
  moderado: { bg: 'bg-yellow-50', text: 'text-yellow-700', badge: 'bg-yellow-100' },
  alto: { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100' },
  crítico: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100' },
}

const STATUS_BADGES = {
  'en-revisión': { text: 'En Revisión', color: 'bg-blue-100 text-blue-700' },
  activo: { text: 'Activo', color: 'bg-red-100 text-red-700' },
  mitigado: { text: 'Mitigado', color: 'bg-green-100 text-green-700' },
  controlado: { text: 'Controlado', color: 'bg-purple-100 text-purple-700' },
}

const mapScoreToLabel = (score) => {
  if (score == null) return '-'
  const normalized = Math.max(1, Math.min(4, Math.round(score)))
  if (normalized === 1) return 'baja'
  if (normalized === 2) return 'moderado'
  if (normalized === 3) return 'alta'
  return 'crítica'
}

const getRiskLevelLabel = (risk) => {
  const candidate = Math.max(
    risk.residual_probability ?? 0,
    risk.inherent_probability ?? 0,
    risk.residual_impact ?? 0,
    risk.inherent_impact ?? 0
  )
  if (candidate >= 4) return 'crítico'
  if (candidate >= 3) return 'alto'
  if (candidate >= 2) return 'moderado'
  return 'bajo'
}

const getStatusLabel = (risk) => {
  if (risk.status) return risk.status
  const hasControls = Array.isArray(risk.controls) && risk.controls.length > 0
  if (hasControls && risk.reviewed_at) return 'activo'
  if (risk.reviewed_at) return 'mitigado'
  return 'en-revisión'
}

const getOwnerLabel = (risk) => {
  if (risk.assigned_to_name) return risk.assigned_to_name
  if (risk.assigned_to?.full_name) return risk.assigned_to.full_name
  if (risk.assigned_to_id) return `ID ${risk.assigned_to_id}`
  return '—'
}

const getDisplayDate = (risk) => {
  const timestamp = risk.updated_at ?? risk.created_at
  if (!timestamp) return '-'
  try {
    return new Date(timestamp).toLocaleDateString('es-ES')
  } catch {
    return '-'
  }
}

const getLevelStyle = (level) => LEVEL_STYLES[level] || LEVEL_STYLES.moderado

const getStatusBadge = (status) => STATUS_BADGES[status] || STATUS_BADGES['en-revisión']

export default function RiskAnalysis() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')
  const { isAuthenticated } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }))
  const { risks, loading, error, fetchRisks, creating, createRisk } = useRiskStore((state) => ({
    risks: state.risks,
    loading: state.loading,
    error: state.error,
    fetchRisks: state.fetchRisks,
    creating: state.creating,
    createRisk: state.createRisk,
  }))
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [toastInfo, setToastInfo] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      fetchRisks()
    }
  }, [isAuthenticated, fetchRisks])

  const handleRiskSubmit = async (payload) => {
    const created = await createRisk(payload)
    const hasControls = payload.controls?.length > 0
    setIsWizardOpen(false)
    setToastInfo({
      message: `Riesgo guardado correctamente ${hasControls ? 'con controles' : 'sin controles'}.`,
      type: hasControls ? 'success' : 'info',
    })
    return created
  }

  const handleToastClose = () => {
    setToastInfo(null)
    fetchRisks()
  }

  const filteredRisks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return risks.filter((risk) => {
      const title = (risk.process_name || '').toLowerCase()
      const description = (risk.risk_description || '').toLowerCase()
      const matchesSearch =
        !query || title.includes(query) || description.includes(query)
      const level = getRiskLevelLabel(risk)
      const matchesLevel = filterLevel === 'all' || level === filterLevel
      return matchesSearch && matchesLevel
    })
  }, [searchTerm, filterLevel, risks])

  const stats = useMemo(() => {
    const total = risks.length
    const critical = risks.filter((risk) => getRiskLevelLabel(risk) === 'crítico').length
    const mitigated = risks.filter((risk) => getStatusLabel(risk) === 'mitigado').length
    const inProcess = risks.filter((risk) => {
      const status = getStatusLabel(risk)
      return status === 'activo' || status === 'en-revisión'
    }).length
    return { total, critical, mitigated, inProcess }
  }, [risks])

  const displayRisks = filteredRisks

  return (
    <>
      <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Análisis de Riesgos</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Identificación, evaluación y tratamiento de riesgos operativos
          </p>
        </div>
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1 md:max-w-2xl">
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

        <button
          type="button"
          onClick={() => setIsWizardOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} />
          Nuevo Riesgo
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-sm font-semibold mb-1">Total Riesgos</p>
          <p className="text-3xl font-black text-gray-900">{loading ? '...' : stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-sm font-semibold mb-1">Críticos</p>
          <p className="text-3xl font-black text-red-600">{loading ? '...' : stats.critical}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-sm font-semibold mb-1">Mitigados</p>
          <p className="text-3xl font-black text-green-600">{loading ? '...' : stats.mitigated}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-sm font-semibold mb-1">En Proceso</p>
          <p className="text-3xl font-black text-blue-600">{loading ? '...' : stats.inProcess}</p>
        </div>
      </div>

      {/* Risk List */}
      <div className="space-y-4">
        {loading && (
          <div className="text-sm text-gray-500">Cargando riesgos...</div>
        )}
        {!loading && displayRisks.length === 0 && (
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-300 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-gray-900 font-semibold mb-2">No hay riesgos registrados</h3>
            <p className="text-gray-600 mb-6">Los riesgos se cargarán desde el backend</p>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all">
              Crear Primer Riesgo
            </button>
          </div>
        )}
        {displayRisks.map((risk) => {
          const levelLabel = getRiskLevelLabel(risk)
          const statusLabel = getStatusLabel(risk)
          const levelColors = getLevelStyle(levelLabel)
          const statusBadge = getStatusBadge(statusLabel)
          const probabilityLabel = mapScoreToLabel(risk.residual_probability ?? risk.inherent_probability)
          const impactLabel = mapScoreToLabel(risk.residual_impact ?? risk.inherent_impact)
          const ownerLabel = getOwnerLabel(risk)
          const displayDate = getDisplayDate(risk)

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
                      {risk.process_name || 'Riesgo sin título'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {risk.risk_description || 'Sin descripción disponible'}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusBadge.color}`}>
                        {statusBadge.text}
                      </span>
                      <span className="text-xs text-gray-500">Probabilidad: {probabilityLabel}</span>
                      <span className="text-xs text-gray-500">Impacto: {impactLabel}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-6 h-6 ${levelColors.text} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                <span>
                  Responsable: <strong>{ownerLabel}</strong>
                </span>
                <span>{displayDate}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    <RiskWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleRiskSubmit}
        isSubmitting={creating}
      />
      {toastInfo && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-2xl">
          <CheckCircle className="w-6 h-6 text-emerald-500" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">{toastInfo.message}</p>
            <p className="text-xs text-gray-500">Cierra para recargar la lista.</p>
          </div>
          <button
            type="button"
            onClick={handleToastClose}
            className="text-blue-600 text-xs font-semibold uppercase tracking-wide"
          >
            Cerrar
          </button>
        </div>
      )}
    </>
  )
}
