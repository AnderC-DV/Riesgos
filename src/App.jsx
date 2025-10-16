import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layouts/DashboardLayout'
import RiskDashboard from './pages/RiskDashboard'
import RiskAnalysis from './pages/RiskAnalysis'
import Controls from './pages/Controls'
import Assets from './pages/Assets'
import Reports from './pages/Reports'
import Administration from './pages/Administration'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Routes>
        {/* Ruta de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas Protegidas */}
        {isAuthenticated ? (
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<RiskDashboard />} />
            <Route path="/analysis" element={<RiskAnalysis />} />
            <Route path="/controls" element={<Controls />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<Administration />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  )
}

export default App
