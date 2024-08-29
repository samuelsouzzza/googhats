import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GooGhats • Chat App',
  description:
    'Um aplicativo de troca de mensagens usando a autenticação do Google.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
