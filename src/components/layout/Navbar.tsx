import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Bell,
  LogOut,
  Settings,
  ChevronDown,
  Calendar,
  MessageSquare,
  FileText,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Why BBK', href: '/why-bbk' },
  { name: 'Industries', href: '/industries' },
  { name: 'Consultants', href: '/consultants' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, profile, signOut, isConsultant, isAdmin } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getDashboardPath = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isConsultant) return '/consultant/dashboard';
    return '/client/dashboard';
  };

  const dashboardLinks = isConsultant || isAdmin
    ? [
        { name: 'Dashboard', href: getDashboardPath(), icon: LayoutDashboard },
        { name: 'Appointments', href: `${getDashboardPath()}/appointments`, icon: Calendar },
        { name: 'Messages', href: `${getDashboardPath()}/messages`, icon: MessageSquare },
        { name: 'Documents', href: `${getDashboardPath()}/documents`, icon: FileText },
      ]
    : [
        { name: 'My Appointments', href: '/client/dashboard', icon: Calendar },
        { name: 'Messages', href: '/client/dashboard/messages', icon: MessageSquare },
        { name: 'Documents', href: '/client/dashboard/documents', icon: FileText },
        { name: 'Reviews', href: '/client/dashboard/reviews', icon: FileText },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/BBK_Logo.png" alt="BBK Consultancy" className="h-14 lg:h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full" />
                    )}
                  </button>

                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-soft-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                          <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-primary-600 hover:underline"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.slice(0, 5).map((notification) => (
                              <div
                                key={notification.id}
                                onClick={() => markAsRead(notification.id)}
                                className={`px-4 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                                  !notification.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                                }`}
                              >
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                  {notification.title}
                                </p>
                                {notification.content && (
                                  <p className="text-xs text-slate-500 mt-0.5">{notification.content}</p>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-6 text-center text-slate-500">
                              No notifications
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-medium">
                      {profile?.name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-soft-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                          <p className="font-medium text-slate-900 dark:text-white">{profile?.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>

                        <div className="py-2">
                          {dashboardLinks.map((link) => (
                            <Link
                              key={link.name}
                              to={link.href}
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                              <link.icon className="w-4 h-4" />
                              {link.name}
                            </Link>
                          ))}

                          <Link
                            to={`/${isConsultant ? 'consultant' : isAdmin ? 'admin' : 'client'}/profile`}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>

                          <button
                            onClick={() => {
                              signOut();
                              setProfileOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/login" className="btn-ghost">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
          >
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {!user && (
                <div className="pt-4 space-y-2 border-t border-slate-200 dark:border-slate-700">
                  <Link to="/login" className="btn-secondary w-full">
                    Sign in
                  </Link>
                  <Link to="/register" className="btn-primary w-full">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
