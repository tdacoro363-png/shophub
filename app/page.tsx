import Header from "./components/Header";
import Banner from "./components/Banner";
import Categoria from "./components/Categoria";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

export default function Home() {

  const produtos = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    nome: `Produto ${index + 1}`,
    preco: (49 + index * 13).toFixed(2)
  }));

  return (
    <main className="bg-gray-100 min-h-screen">

      <Header />

      <Banner />

      <Categoria />

      <section className="max-w-7xl mx-auto py-10 px-5">

        <h2 className="text-3xl font-bold mb-8">
          Produtos em destaque
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {produtos.map(produto=>(
            <ProductCard
              key={produto.id}
              nome={produto.nome}
              preco={produto.preco}
            />
          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}