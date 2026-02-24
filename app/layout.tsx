import type { Metadata } from 'next';
import { Oswald, Montserrat } from 'next/font/google';
import './globals.css';


const title = Oswald({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const body = Montserrat({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://pagodinhodofera.vercel.app'),
  title: 'Pagodinho do Fera | O Show que Transforma Eventos',
  description:
    'Energia, profissionalismo e o melhor do pagode para seu evento. Casamentos, aniversários e corporativos com quem entende do assunto.',
  keywords: ['pagode salvador', 'banda casamento', 'show ao vivo', 'pagodinho do fera', 'samba'],
  openGraph: {
    title: 'Pagodinho do Fera',
    description: 'Transforme seu evento com a energia do Pagodinho do Fera.',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/logo.jpg', // Assuming this exists, or use a better image
        width: 800,
        height: 600,
        alt: 'Pagodinho do Fera',
      },
    ],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${title.variable} ${body.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}
