import '@/styles/globals.css';
import { Navbar } from '@/components/navbar';
import Footer from '@/components/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative">
        <div className="fixed top-5 left-0 right-0 z-50">
          <Navbar />
        </div>
      </div>
      <main className="main_box">{children}</main>

      <Footer />
    </>
  );
}
