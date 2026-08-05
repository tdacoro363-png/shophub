type Props = {
  nome: string;
  preco: string;
};

export default function ProductCard({ nome, preco }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4">

      <div className="w-full h-52 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">
          Imagem do Produto
        </span>
      </div>

      <h3 className="mt-4 font-bold text-lg line-clamp-2">
        {nome}
      </h3>

      <p className="text-orange-600 text-2xl font-bold mt-2">
        R$ {preco}
      </p>

      <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold">
        Comprar
      </button>

    </div>
  );
}