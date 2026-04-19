import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { AuthModal } from "@/components/auth/AuthModal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-lot-paper">
        <Header />
        <main className="flex-1 pt-[calc(var(--topbar-height,36px)+var(--header-height,64px))] md:pt-[calc(var(--topbar-height,36px)+var(--header-height-md,112px))]">
          {children}
        </main>
        <AuthModal />
        <Footer />
      </div>
    </>
  );
}
