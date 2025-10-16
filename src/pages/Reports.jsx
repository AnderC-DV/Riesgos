import { Download, FileText, BarChart3, TrendingUp, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function Reports() {
  const [dateRange, setDateRange] = useState('monthly')

  const reports = [
    {
      id: 1,
      title: 'Reporte Ejecutivo de Riesgos',
      description: 'Resumen completo del estado actual de riesgos y controles',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600',
      formats: ['PDF', 'Excel', 'PPT']
    },
    {
      id: 2,
      title: 'Análisis de Tendencias',
      description: 'Evolución de riesgos, controles y activos en el tiempo',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      formats: ['PDF', 'Excel']
    },
    {
      id: 3,
      title: 'Matriz de Riesgos',
      description: 'Visualización gráfica de probabilidad e impacto',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      formats: ['PDF', 'PNG']
    },
    {
      id: 4,
      title: 'Auditoría de Controles',
      description: 'Detalle de la efectividad y cumplimiento de controles',
      icon: FileText,
      color: 'from-orange-500 to-red-600',
      formats: ['PDF', 'Excel']
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-gray-900">Reportes y Análisis</h1>
        <p className="text-gray-600 mt-2 text-lg">Generación de reportes y análisis detallados de la gestión de riesgos</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <label className="text-sm font-semibold text-gray-700">Período:</label>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          >
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
            <option value="quarterly">Trimestral</option>
            <option value="yearly">Anual</option>
          </select>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            Aplicar Filtro
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <div
              key={report.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
            >
              {/* Header with gradient */}
              <div className={`h-24 bg-gradient-to-br ${report.color} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10">
                  <Icon className="w-32 h-32 text-white absolute -bottom-10 -right-10 rotate-45" />
                </div>
                <div className="relative h-full flex items-center justify-between p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{report.description}</p>

                {/* Formats */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {report.formats.map((format) => (
                    <span key={format} className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {format}
                    </span>
                  ))}
                </div>

                {/* Download Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform group-hover:scale-105">
                    <Download size={16} />
                    <span className="text-sm">Descargar</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm">Vista Previa</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recently Generated Reports */}
      <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reportes Generados Recientemente</h2>
        <div className="space-y-3">
          {[
            { name: 'Reporte Ejecutivo - Octubre 2025', date: '2025-10-16', size: '2.4 MB', format: 'PDF' },
            { name: 'Análisis Trimestral - Q3 2025', date: '2025-10-10', size: '5.1 MB', format: 'Excel' },
            { name: 'Matriz de Riesgos Mensual', date: '2025-10-05', size: '1.8 MB', format: 'PDF' },
          ].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.date} • {file.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {file.format}
                </span>
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Opciones de Exportación</h2>
        <p className="text-gray-600 mb-6">Descarga todos tus reportes en el formato que prefieras</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="px-6 py-4 bg-white border-2 border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
            <Download size={20} />
            Exportar como PDF
          </button>
          <button className="px-6 py-4 bg-white border-2 border-emerald-300 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
            <Download size={20} />
            Exportar como Excel
          </button>
          <button className="px-6 py-4 bg-white border-2 border-purple-300 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
            <Download size={20} />
            Exportar como PowerPoint
          </button>
        </div>
      </div>
    </div>
  )
}
