import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
