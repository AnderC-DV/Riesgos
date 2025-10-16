import { Plus, Users, Settings, Lock, Globe, Bell, Trash2, Edit2, Shield } from 'lucide-react'
import { useState } from 'react'

export default function Administration() {
  const [activeTab, setActiveTab] = useState('users')

  const users = [
    { id: 1, name: 'Juan García', email: 'juan@empresa.com', role: 'admin', status: 'activo', lastLogin: '2025-10-16' },
    { id: 2, name: 'María López', email: 'maria@empresa.com', role: 'analyst', status: 'activo', lastLogin: '2025-10-15' },
    { id: 3, name: 'Carlos Rodríguez', email: 'carlos@empresa.com', role: 'viewer', status: 'inactivo', lastLogin: '2025-10-10' },
  ]

  const getRoleColor = (role) => {
    const colors = {
      admin: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100' },
      analyst: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100' },
      viewer: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100' },
    }
    return colors[role] || colors.viewer
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-gray-900">Administración</h1>
        <p className="text-gray-600 mt-2 text-lg">Gestión de usuarios, permisos y configuración del sistema</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 font-semibold border-b-2 transition-all ${
            activeTab === 'users'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-5 h-5 inline mr-2" />
          Gestión de Usuarios
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-semibold border-b-2 transition-all ${
            activeTab === 'settings'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings className="w-5 h-5 inline mr-2" />
          Configuración
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-6 py-3 font-semibold border-b-2 transition-all ${
            activeTab === 'security'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Lock className="w-5 h-5 inline mr-2" />
          Seguridad
        </button>
      </div>

      {/* Content */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
            <Plus size={20} />
            Agregar Usuario
          </button>

          {/* Users Table */}
          <div className="space-y-4">
            {users.map((user) => {
              const roleColors = getRoleColor(user.role)
              return (
                <div
                  key={user.id}
                  className={`${roleColors.bg} rounded-2xl p-6 border-2 border-gray-100 hover:shadow-lg transition-all`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="md:col-span-2">
                      <h3 className={`font-bold ${roleColors.text} text-lg`}>{user.name}</h3>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Rol</p>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${roleColors.badge} ${roleColors.text} capitalize inline-block`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Estado</p>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${user.status === 'activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {user.status === 'activo' ? '✓ Activo' : '○ Inactivo'}
                      </span>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Edit2 className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-200 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Settings */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-500" />
                Configuración General
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Sistema</label>
                  <input type="text" value="Sistema de Gestión de Riesgos" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL del Backend</label>
                  <input type="url" value="http://localhost:3001/api" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-orange-500" />
                Notificaciones
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500 cursor-pointer rounded" />
                  <span className="text-gray-700 font-semibold">Alertas de Riesgos</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500 cursor-pointer rounded" />
                  <span className="text-gray-700 font-semibold">Cambios de Controles</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500 cursor-pointer rounded" />
                  <span className="text-gray-700 font-semibold">Actualizaciones de Sistema</span>
                </label>
                <button className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors mt-4">
                  Guardar Preferencias
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Authentication */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-red-500" />
                Autenticación
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500 cursor-pointer rounded" />
                  <span className="text-gray-700 font-semibold">Autenticación de 2 Factores</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500 cursor-pointer rounded" />
                  <span className="text-gray-700 font-semibold">Requerir HTTPS</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500 cursor-pointer rounded" />
                  <span className="text-gray-700 font-semibold">CORS Habilitado</span>
                </label>
                <button className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors mt-4">
                  Guardar Configuración de Seguridad
                </button>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-500" />
                Permisos y Roles
              </h3>
              <div className="space-y-3">
                <div className="p-4 border-2 border-gray-100 rounded-lg">
                  <p className="font-semibold text-gray-900">Administrador</p>
                  <p className="text-sm text-gray-600">Acceso total al sistema</p>
                </div>
                <div className="p-4 border-2 border-gray-100 rounded-lg">
                  <p className="font-semibold text-gray-900">Analista</p>
                  <p className="text-sm text-gray-600">Lectura y escritura en riesgos y controles</p>
                </div>
                <div className="p-4 border-2 border-gray-100 rounded-lg">
                  <p className="font-semibold text-gray-900">Visor</p>
                  <p className="text-sm text-gray-600">Solo lectura de reportes y análisis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
