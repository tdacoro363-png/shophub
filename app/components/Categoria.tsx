export default function Categoria() {
  const categorias = [
    "Eletrônicos",
    "Celulares",
    "Informática",
    "Moda",
    "Casa",
    "Esportes",
    "Beleza",
    "Automotivo"
  ];

  return (
    <section className="bg-white py-6 shadow">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-2xl font-bold mb-4">
          Categorias
        </h2>

        <div className="flex flex-wrap gap-3">

          {categorias.map((categoria) => (
            <button
              key={categoria}
              className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
            >
              {categoria}
            </button>
          ))}

        </div>
      </div>
    </section>
  );
}