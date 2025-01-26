import "./lpEbook.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import ValueProposition from "../../components/ValueProposition/ValueProposition";
import ProductSection from "../../components/ProductSection/ProductSection";
import EbookSection from "../../components/EbookSection/EbookSection";
export default function Ebook() {
  return (
    <div>
      <HeroSection />
      <ValueProposition />
      <EbookSection />
      <ProductSection />
    </div>
  );
}
