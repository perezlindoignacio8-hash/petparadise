'use client';

import { useEffect } from 'react';

const AWAY_TITLE = '🐾 ¡Tus productos te están esperando!';
const DEFAULT_TITLE = 'Pet Paradise';

export default function TabTitleManager() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? AWAY_TITLE : DEFAULT_TITLE;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return null;
}
