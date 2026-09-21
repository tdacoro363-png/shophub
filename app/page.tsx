import Header from "@/app/components/Header";
import Banner from "@/app/components/Banner";
import Categoria from "@/app/components/Categoria";
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";
import { PrismaClient } from "@prisma/client";
export const dynamic = "force-dynamic";
const prisma = new PrismaClient();

const POR_PAGINA = 24;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    pagina?: string;
  }>;
}) {
  const params = await searchParams;

  const busca = params.q?.trim() || "";
  const paginaSolicitada = Number(params.pagina) || 1;

  const where = busca
    ? {
        title: {
          contains: busca,
        },
      }
    : {};

  const totalProdutos = await prisma.product.count({
    where,
  });

  const totalPaginas = Math.max(
    1,
    Math.ceil(totalProdutos / POR_PAGINA)
  );

  const pagina = Math.min(
    Math.max(1, paginaSolicitada),
    totalPaginas
  );

  const produtos = await prisma.product.findMany({
    where,
    take: POR_PAGINA,
    skip: (pagina - 1) * POR_PAGINA,
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

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              {busca
                ? `Resultados para "${busca}"`
                : "Produtos em destaque"}
            </h2>

            {busca && (
              <p className="text-gray-600 mt-2">
                Encontramos {totalProdutos.toLocaleString("pt-BR")} produtos.
              </p>
            )}
          </div>

          {!busca && (
            <span className="text-gray-600">
              {totalProdutos.toLocaleString("pt-BR")} produtos
            </span>
          )}
        </div>

        {produtos.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center">
            <h3 className="text-xl font-bold">
              Nenhum produto encontrado
            </h3>

            <p className="text-gray-600 mt-2">
              Tente pesquisar por outro termo.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {produtos.map((produto) => (
  <ProductCard
    key={produto.id}
    name={produto.title}
    preco={Number(produto.salePrice || produto.price)}
    precoOriginal={Number(produto.price)}
    desconto={Number(produto.discountPercentage)}
    imagem={produto.imageLink}
    avaliacao={
      produto.itemRating
        ? Number(produto.itemRating)
        : null
    }
    likes={produto.likes}
    link={produto.productLink}
  />
))}
            </div>

            {totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">

                {pagina > 1 && (
                  <a
                    href={`/?pagina=${pagina - 1}${
                      busca
                        ? `&q=${encodeURIComponent(busca)}`
                        : ""
                    }`}
                    className="px-5 py-3 bg-white rounded-lg shadow font-semibold"
                  >
                    ← Anterior
                  </a>
                )}

                <span className="px-5 py-3 bg-orange-500 text-white rounded-lg font-semibold">
                  Página {pagina} de {totalPaginas}
                </span>

                {pagina < totalPaginas && (
                  <a
                    href={`/?pagina=${pagina + 1}${
                      busca
                        ? `&q=${encodeURIComponent(busca)}`
                        : ""
                    }`}
                    className="px-5 py-3 bg-orange-500 text-white rounded-lg font-semibold"
                  >
                    Próxima →
                  </a>
                )}

              </div>
            )}
          </>
        )}

      </section>

      <Footer />

    </main>
  );
}