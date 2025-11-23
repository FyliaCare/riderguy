import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './stores/auth.store';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import NewDelivery from './pages/NewDelivery';
import Deliveries from './pages/Deliveries';
import Billing from './pages/Billing';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import ProfileSetup from './pages/ProfileSetup';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated, business } = useAuthStore();

  // Check if business profile is incomplete
  const needsProfileSetup = isAuthenticated && business && !business.businessType;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                needsProfileSetup ? (
                  <Routes>
                    <Route path="/setup" element={<ProfileSetup />} />
                    <Route path="*" element={<Navigate to="/setup" replace />} />
                  </Routes>
                ) : (
                  <DashboardLayout>
                    <Routes>
                      <Route path="/" element={<Overview />} />
                      <Route path="/new-delivery" element={<NewDelivery />} />
                      <Route path="/deliveries" element={<Deliveries />} />
                      <Route path="/billing" element={<Billing />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </DashboardLayout>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
