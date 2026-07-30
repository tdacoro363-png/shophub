 export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Cabeçalho */}
      <header className="bg-orange-500 text-white p-5 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            ShopHub
          </h1>

          <input
            type="text"
            placeholder="Pesquisar produtos..."
            className="w-96 p-3 rounded-lg text-black outline-none"
          />

        </div>
      </header>

      {/* Conteúdo */}

      <section className="max-w-7xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-6">
          Produtos em Destaque
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {Array.from({ length: 8 }).map((_, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >

              <div className="bg-gray-200 h-56 flex items-center justify-center">

                📦 Imagem

              </div>

              <div className="p-4">

                <h3 className="font-bold text-lg">
                  Produto {index + 1}
                </h3>

                <p className="text-orange-600 text-2xl font-bold mt-2">
                  R$ 99,90
                </p>

                <button
                  className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg"
                >
                  Comprar na Shopee
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}