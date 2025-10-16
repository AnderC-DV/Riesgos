import { Plus, Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function Controls() {
  const controls = [
    {
      id: 1,
      name: 'Autenticación de dos factores',
      type: 'preventivo',
      status: 'activo',
      effectiveness: 95,
      lastReview: '2025-10-10'
    },
    {
      id: 2,
      name: 'Validación de entrada de datos',
      type: 'detectivo',
      status: 'activo',
      effectiveness: 88,
      lastReview: '2025-10-08'
    },
    {
      id: 3,
      name: 'Auditoría de cambios',
      type: 'detectivo',
      status: 'en-revisión',
      effectiveness: 82,
      lastReview: '2025-10-05'
    },
  ]

  const getTypeColor = (type) => {
    const colors = {
      preventivo: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100' },
      detectivo: { bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-100' },
      correctivo: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100' },
    }
    return colors[type] || colors.preventivo
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-gray-900">Gestión de Controles</h1>
        <p className="text-gray-600 mt-2 text-lg">Definición y monitoreo de controles preventivos, detectivos y correctivos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
          <Shield className="w-8 h-8 text-blue-600 mb-3" />
          <p className="text-gray-600 text-sm font-semibold mb-1">Controles Activos</p>
          <p className="text-4xl font-black text-blue-600">18</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
          <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
          <p className="text-gray-600 text-sm font-semibold mb-1">Efectividad Promedio</p>
          <p className="text-4xl font-black text-green-600">88%</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-100">
          <Clock className="w-8 h-8 text-orange-600 mb-3" />
          <p className="text-gray-600 text-sm font-semibold mb-1">Pendientes de Revisión</p>
          <p className="text-4xl font-black text-orange-600">3</p>
        </div>
      </div>

      {/* Action Bar */}
      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
        <Plus size={20} />
        Nuevo Control
      </button>

      {/* Controls List */}
      <div className="grid grid-cols-1 gap-4">
        {controls.length > 0 ? (
          controls.map((control) => {
            const typeColors = getTypeColor(control.type)
            const isActive = control.status === 'activo'
            return (
              <div
                key={control.id}
                className={`${typeColors.bg} rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all cursor-pointer group`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className={`text-lg font-bold ${typeColors.text}`}>{control.name}</h3>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${typeColors.badge} capitalize`}>
                        {control.type}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {isActive ? '✓ Activo' : 'En Revisión'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">Efectividad</span>
                          <span className={`text-sm font-bold ${control.effectiveness >= 90 ? 'text-green-600' : control.effectiveness >= 80 ? 'text-yellow-600' : 'text-orange-600'}`}>
                            {control.effectiveness}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              control.effectiveness >= 90 ? 'bg-green-500' : control.effectiveness >= 80 ? 'bg-yellow-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${control.effectiveness}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-3">Última revisión: {new Date(control.lastReview).toLocaleDateString('es-ES')}</p>
                    </div>
                  </div>
                  <AlertCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            )
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-300 text-center">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-gray-900 font-semibold mb-2">No hay controles registrados</h3>
            <p className="text-gray-600">Los controles se cargarán desde el backend</p>
          </div>
        )}
      </div>
    </div>
  )
}
