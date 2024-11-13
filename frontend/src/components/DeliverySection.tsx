import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Biblioteca React Leaflet para mapas interativos
import "leaflet/dist/leaflet.css"; // Estilos do Leaflet
import L from "leaflet";

// Definindo o ícone de marcador
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Dados de cidades para entregas
const fridayCities: [string, number, number][] = [
  ["Novo Hamburgo", -29.6875, -51.1316],
  ["Campo Bom", -29.6747, -51.0601],
  ["Estância Velha", -29.6484, -51.1731],
  ["Ivoti", -29.5992, -51.1609],
  ["Portão", -29.7012, -51.2419],
];

const saturdayCities: [string, number, number][] = [
  ["Porto Alegre", -30.0277, -51.2287],
  ["Canoas", -29.9175, -51.1836],
  ["Esteio", -29.8512, -51.1841],
  ["Sapucaia do Sul", -29.8314, -51.145],
  ["São Leopoldo", -29.754, -51.1498],
];

function DeliverySection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center pb-5">
        <h2 className="text-4xl font-bold mb-8">Nossas Entregas</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
          Realizamos entregas quinzenais em diversas cidades da região. Para
          otimizar o atendimento e garantir a qualidade, dividimos as entregas
          entre sextas e sábados, conforme a lista de cidades abaixo.
        </p>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">
          <span className="text-green-600 font-semibold">
            Você pode fazer seu pedido a qualquer momento pelo WhatsApp
          </span>
          , e nós o encaixamos no nosso fluxo de entregas para a próxima data
          disponível na sua região.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
        {/* Entregas nas Sextas */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Entregas nas Sextas</h3>
          <p className="text-lg text-gray-700 mb-4">
            As entregas nas sextas-feiras são realizadas nas seguintes cidades:
          </p>
          <ul className="list-disc list-inside mb-4 text-lg text-gray-700">
            {fridayCities.map(([city]) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
          <MapContainer
            center={[-29.6875, -51.1316]}
            zoom={10}
            style={{ minHeight: "300px", width: "100%" }} // Responsividade com largura total e altura mínima
            className="rounded-lg shadow-md"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {fridayCities.map(([city, lat, lng]) => (
              <Marker key={city} position={[lat, lng]} icon={markerIcon}>
                <Popup>{city}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Entregas nos Sábados */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Entregas nos Sábados</h3>
          <p className="text-lg text-gray-700 mb-4">
            Aos sábados, realizamos entregas nas seguintes cidades:
          </p>
          <ul className="list-disc list-inside mb-4 text-lg text-gray-700">
            {saturdayCities.map(([city]) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
          <MapContainer
            center={[-29.9175, -51.1836]}
            zoom={10}
            style={{ minHeight: "300px", width: "100%" }} // Responsividade com largura total e altura mínima
            className="rounded-lg shadow-md"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {saturdayCities.map(([city, lat, lng]) => (
              <Marker key={city} position={[lat, lng]} icon={markerIcon}>
                <Popup>{city}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

export default DeliverySection;
