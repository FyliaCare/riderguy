import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth.store';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import TaskBoard from './pages/TaskBoard';
import RiderMap from './pages/RiderMap';
import IncidentManagement from './pages/IncidentManagement';
import Analytics from './pages/Analytics';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<TaskBoard />} />
                  <Route path="/map" element={<RiderMap />} />
                  <Route path="/incidents" element={<IncidentManagement />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
