import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Layout } from './components/layout/Layout';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ConsultantsPage } from './pages/ConsultantsPage';
import { ConsultantDetailPage } from './pages/ConsultantDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { BookPage } from './pages/BookPage';
import { WhyBbkPage } from './pages/WhyBbkPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { GlobalLandscapePage } from './pages/GlobalLandscapePage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { OurProcessPage } from './pages/OurProcessPage';
import { FaqPage } from './pages/FaqPage';

// Dashboard Pages
import { ClientDashboard } from './pages/client/ClientDashboard';
import { MessagesPage } from './pages/client/MessagesPage';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/why-bbk" element={<WhyBbkPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/global-accounting-landscape" element={<GlobalLandscapePage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/our-process" element={<OurProcessPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/consultants" element={<ConsultantsPage />} />
        <Route path="/consultants/:id" element={<ConsultantDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book" element={<ProtectedRoute><BookPage /></ProtectedRoute>} />

        {/* Client Dashboard Routes */}
        <Route path="/client/dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
        <Route path="/client/dashboard/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/client/dashboard/documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />

        {/* Consultant Dashboard Routes */}
        <Route path="/consultant/dashboard" element={<ProtectedRoute><ConsultantDashboardPage /></ProtectedRoute>} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Auth Routes (without layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

// Placeholder components for dashboards
function DocumentsPage() {
  return (
    <div className="min-h-screen pt-24 bg-slate-50 dark:bg-slate-950">
      <div className="container-custom">
        <h1 className="text-2xl font-bold mb-4">Documents</h1>
        <p className="text-slate-500">Document management coming soon...</p>
      </div>
    </div>
  );
}

function ConsultantDashboardPage() {
  return (
    <div className="min-h-screen pt-24 bg-slate-50 dark:bg-slate-950">
      <div className="container-custom">
        <h1 className="text-2xl font-bold mb-4">Consultant Dashboard</h1>
        <p className="text-slate-500">Manage your consultations and clients.</p>
      </div>
    </div>
  );
}

function AdminDashboardPage() {
  return (
    <div className="min-h-screen pt-24 bg-slate-50 dark:bg-slate-950">
      <div className="container-custom">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-slate-500">System administration panel.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
