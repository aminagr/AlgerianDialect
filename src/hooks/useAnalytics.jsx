import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    window.gtag('config', 'G-TGJNTDTX6G', {
      page_path: location.pathname,
    });
  }, [location]);
};

export default useAnalytics;
