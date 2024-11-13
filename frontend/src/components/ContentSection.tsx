import AboutUS from "../assets/sobre.jpeg";

function ContentSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-6 space-y-4 md:space-y-0 md:space-x-8 mt-4">
      <img
        src={AboutUS}
        alt="Sobre nós"
        className="w-full md:w-1/3 rounded-lg shadow-lg mx-auto"
      />
      <div className="flex flex-col justify-start items-start mt-4 md:mt-0">
        <h1 className="text-6xl font-bold font-cormorant text-center w-full mb-6">
          Sobre nós
        </h1>
        <h2 className="text-3xl font-medium font-cormorant mb-6">
          O <strong>Sítio Campestre</strong> é uma unidade de produção da
          Agricultura Familiar, localizada na zona rural de São Sebastião do
          Caí. Dedicamo-nos com carinho à produção de cogumelos culinários de
          alta qualidade, cultivados com técnicas cuidadosas que garantem sabor,
          frescor e excelência em cada colheita. No centro do nosso trabalho
          está a{" "}
          <span className="text-green-500">
            <strong>produção sustentável e artesanal </strong>
          </span>
          garantindo produtos frescos diretamente ao consumidor.
        </h2>
        <div className="flex flex-col justify-start items-start mt-4 md:mt-0">
          <h1 className="text-5xl font-bold font-cormorant w-full mb-6">
            Valores
          </h1>
          <h2 className="text-3xl font-medium font-cormorant mb-6">
            Acreditamos no valor da agricultura familiar e no impacto positivo
            que ela pode ter nas comunidades locais. Cada etapa do nosso
            processo é conduzida com respeito à natureza, garantindo alimentos
            saudáveis, naturais e sem aditivos químicos, preservando o
            equilíbrio ambiental e promovendo uma produção orgânica e
            sustentável.
          </h2>
        </div>
      </div>
    </section>
  );
}

export default ContentSection;
