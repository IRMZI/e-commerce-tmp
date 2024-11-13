import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>{" "}
      {/* Conteúdo dinâmico da página */}
      <FooterSection />
    </div>
  );
};

export default Layout;
