import { ReactNode } from 'react';
import { Header, Footer } from '../components/index';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
