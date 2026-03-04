import './portal.css';
import './portal-mobile.css';
import './portal-nav.css';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen bg-[#F8FAFC]`}>
        {children}
      </body>
    </html>
  );
}
