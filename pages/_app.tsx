import '../styles/style.css'; // Import the global CSS file
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { UserProvider } from './components/UserContext.tsx';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) 
    return null; // Ensures content only renders after mount on client

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;