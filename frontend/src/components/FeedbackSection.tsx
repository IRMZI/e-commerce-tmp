import { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const feedbacks = [
  {
    name: "João Silva",
    image: "/path/to/joao-image.jpg", // substitua pelo caminho correto da imagem
    feedback: "Ótimos produtos e atendimento impecável. Super recomendo!",
    date: "12 de outubro de 2024",
    rating: 5,
  },
  {
    name: "Maria Souza",
    image: "/path/to/maria-image.jpg", // substitua pelo caminho correto da imagem
    feedback: "A qualidade dos cogumelos é incrível! Nunca vi nada igual.",
    date: "5 de setembro de 2024",
    rating: 4,
  },
  {
    name: "Carlos Pereira",
    image: "/path/to/carlos-image.jpg", // substitua pelo caminho correto da imagem
    feedback:
      "O atendimento ao cliente foi muito eficiente. Voltarei a comprar!",
    date: "20 de agosto de 2024",
    rating: 5,
  },
];

function FeedbackSection() {
  const [currentFeedback, setCurrentFeedback] = useState(0);

  const handlePrev = () => {
    setCurrentFeedback(
      currentFeedback === 0 ? feedbacks.length - 1 : currentFeedback - 1
    );
  };

  const handleNext = () => {
    setCurrentFeedback(
      currentFeedback === feedbacks.length - 1 ? 0 : currentFeedback + 1
    );
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Depoimentos de Clientes</h2>
        <div className="relative">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8 flex items-center space-x-6">
                <img
                  src={feedbacks[currentFeedback].image}
                  alt={feedbacks[currentFeedback].name}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <div className="flex-1 text-left">
                  <p className="text-gray-700 italic">
                    "{feedbacks[currentFeedback].feedback}"
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-500">
                    {feedbacks[currentFeedback].name}
                  </p>
                  <div className="mt-2 flex">
                    {/* Renderizando as estrelas */}
                    {[...Array(feedbacks[currentFeedback].rating)].map(
                      (_, index) => (
                        <FaStar key={index} className="text-yellow-500" />
                      )
                    )}
                  </div>
                </div>
                <div className="text-gray-400 text-sm absolute top-2 right-4">
                  {feedbacks[currentFeedback].date}
                </div>
              </div>
            </div>
          </div>
          {/* Botões para navegar no carrossel */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-green-500 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-green-500 hover:text-white transition duration-300"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-green-500 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-green-500 hover:text-white transition duration-300"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeedbackSection;
