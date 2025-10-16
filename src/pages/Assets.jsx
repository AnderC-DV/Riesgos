import { Plus, Package, Server, Database, Zap } from 'lucide-react'

export default function Assets() {
  const assets = [
    {
      id: 1,
      name: 'Servidor Principal',
      type: 'infrastructure',
      value: 50000,
      criticality: 'crítica',
      owner: 'TI',
      lastUpdate: '2025-10-15'
    },
    {
      id: 2,
      name: 'Base de Datos de Clientes',
      type: 'data',
      value: 100000,
      criticality: 'crítica',
      owner: 'BD Team',
      lastUpdate: '2025-10-14'
    },
    {
      id: 3,
      name: 'Sistema de Respaldos',
      type: 'infrastructure',
      value: 30000,
      criticality: 'alta',
      owner: 'TI',
      lastUpdate: '2025-10-10'
    },
  ]

  const getTypeIcon = (type) => {
    const icons = {
      infrastructure: Server,
      data: Database,
      software: Zap,
      other: Package
    }
    return icons[type] || Package
  }

  const getTypeLabel = (type) => {
    const labels = {
      infrastructure: 'Infraestructura',
      data: 'Datos',
      software: 'Software',
      other: 'Otro'
    }
    return labels[type] || 'Otro'
  }

  const getCriticalityColor = (criticality) => {
    const colors = {
      crítica: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100' },
      alta: { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100' },
      media: { bg: 'bg-yellow-50', text: 'text-yellow-700', badge: 'bg-yellow-100' },
      baja: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100' },
    }
    return colors[criticality] || colors.media
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-gray-900">Inventario de Activos</h1>
        <p className="text-gray-600 mt-2 text-lg">Identificación y valorización de activos organizacionales</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
          <Package className="w-8 h-8 text-blue-600 mb-3" />
          <p className="text-gray-600 text-sm font-semibold mb-1">Total de Activos</p>
          <p className="text-3xl font-black text-blue-600">42</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-100">
          <Server className="w-8 h-8 text-red-600 mb-3" />
          <p className="text-gray-600 text-sm font-semibold mb-1">Críticos</p>
          <p className="text-3xl font-black text-red-600">8</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
          <Database className="w-8 h-8 text-purple-600 mb-3" />
          <p className="text-gray-600 text-sm font-semibold mb-1">Valor Total</p>
          <p className="text-3xl font-black text-purple-600">$2.5M</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-100">
          <Zap className="w-8 h-8 text-emerald-600 mb-3" />
          <p className="text-gray-600 text-sm font-semibold mb-1">Monitoreados</p>
          <p className="text-3xl font-black text-emerald-600">38</p>
        </div>
      </div>

      {/* Action Button */}
      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
        <Plus size={20} />
        Nuevo Activo
      </button>

      {/* Assets Table/Cards */}
      <div className="space-y-4">
        {assets.length > 0 ? (
          assets.map((asset) => {
            const TypeIcon = getTypeIcon(asset.type)
            const criticalityColors = getCriticalityColor(asset.criticality)
            return (
              <div
                key={asset.id}
                className={`${criticalityColors.bg} rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all group cursor-pointer`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${criticalityColors.badge}`}>
                        <TypeIcon className={`w-5 h-5 ${criticalityColors.text}`} />
                      </div>
                      <div>
                        <h3 className={`font-bold ${criticalityColors.text}`}>{asset.name}</h3>
                        <p className="text-xs text-gray-600">{getTypeLabel(asset.type)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Valor</p>
                    <p className="font-black text-gray-900">${(asset.value / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Criticidad</p>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${criticalityColors.badge} ${criticalityColors.text} capitalize inline-block`}>
                      {asset.criticality}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Propietario</p>
                    <p className="font-semibold text-gray-900 text-sm">{asset.owner}</p>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-300 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-gray-900 font-semibold mb-2">No hay activos registrados</h3>
            <p className="text-gray-600">Los activos se cargarán desde el backend</p>
          </div>
        )}
      </div>
    </div>
  )
}
