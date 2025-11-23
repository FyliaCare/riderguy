import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth.store';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import UserManagement from './pages/UserManagement';
import RiderManagement from './pages/RiderManagement';
import TaskManagement from './pages/TaskManagement';
import ContentModeration from './pages/ContentModeration';
import SystemSettings from './pages/SystemSettings';

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
                  <Route path="/" element={<Overview />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/riders" element={<RiderManagement />} />
                  <Route path="/tasks" element={<TaskManagement />} />
                  <Route path="/moderation" element={<ContentModeration />} />
                  <Route path="/settings" element={<SystemSettings />} />
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
