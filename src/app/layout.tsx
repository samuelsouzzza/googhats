import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { GlobalContextProvider } from '@/globals/GlobalContext';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GooGhats • Chat App',
  description:
    'Um aplicativo de troca de mensagens usando a autenticação do Google.',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContextProvider>
      <GoogleOAuthProvider clientId='431276368156-k75qlpkl96snrv7onm13ed9qflmtos8j.apps.googleusercontent.com'>
        <html lang='pt-br'>
          <body className={roboto.className}>{children}</body>
        </html>
      </GoogleOAuthProvider>
    </GlobalContextProvider>
  );
}
