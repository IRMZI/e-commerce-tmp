import BG from "../assets/BG.jpg";

function HeroSection() {
  return (
    <section
      className="relative h-[60vh] bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <h1 className="text-6xl font-koulen tracking-wide text-center mb-4 border-b-4 border-white">
        BEM VINDO
      </h1>
      <h3 className="text-3xl font-teko">
        Cogumelos frescos e comestíveis direto do produtor!
      </h3>
    </section>
  );
}

export default HeroSection;
