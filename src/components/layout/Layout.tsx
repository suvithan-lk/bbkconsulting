import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {!isAuthPage && <Navbar />}
      <main className={`flex-1 ${!isAuthPage ? 'pt-16 lg:pt-20' : ''}`}>
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
