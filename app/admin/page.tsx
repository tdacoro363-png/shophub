import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Categoria from "@/components/Categoria";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const produtos = await prisma.product.findMany({
    take: 24,
    orderBy: {
      likes: "desc",
    },
  });

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

          {produtos.map((produto) => (
            <ProductCard
              key={produto.id}
              nome={produto.title}
              preco={String(produto.salePrice || produto.price)}
            />
          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}