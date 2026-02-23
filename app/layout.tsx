import type { Metadata } from 'next';
import { Bebas_Neue, Montserrat } from 'next/font/google';
import './globals.css';

const title = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-title' });
const body = Montserrat({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Pagodinho do Fera | Pagode para eventos em Salvador',
  description:
    'Grupo de pagode para eventos, casamentos, aniversários e corporativos. Contrate pagode em Salvador com energia ao vivo e agenda atualizada.',
  keywords: ['grupo de pagode para eventos', 'pagode para casamento', 'banda para aniversário', 'pagode em Salvador'],
  openGraph: {
    title: 'Pagodinho do Fera',
    description: 'Pagode ao vivo para eventos com energia, presença e conversão direta no WhatsApp.',
    type: 'website',
    locale: 'pt_BR'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${title.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
