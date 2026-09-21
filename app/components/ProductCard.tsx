type Props = {
  name: string;
  preco: number;
  precoOriginal?: number;
  desconto?: number;
  imagem?: string | null;
  avaliacao?: number | null;
  likes?: number | null;
  link?: string | null;
};

export default function ProductCard({
  name,
  preco,
  precoOriginal,
  desconto,
  imagem,
  avaliacao,
  likes,
  link,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4">
      
      <div className="w-full h-52 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        {imagem ? (
          <img
            src={imagem}
            alt={name}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-gray-500">
            Imagem do Produto
          </span>
        )}
      </div>

      <h3 className="mt-4 font-bold text-lg line-clamp-2">
        {name}
      </h3>

      {precoOriginal && precoOriginal > preco && (
        <p className="text-gray-400 line-through mt-2">
          R$ {precoOriginal.toFixed(2).replace(".", ",")}
        </p>
      )}

      <p className="text-orange-600 text-2xl font-bold mt-1">
        R$ {preco.toFixed(2).replace(".", ",")}
      </p>

      {desconto && desconto > 0 && (
        <p className="text-green-600 font-bold mt-1">
          {desconto}% OFF
        </p>
      )}

      {avaliacao !== null && avaliacao !== undefined && (
  <p className="mt-1">
    <span className="text-yellow-500 text-lg">&#9733;</span>{" "}
    <span className="text-gray-700">
      {avaliacao.toFixed(1)}
    </span>
  </p>
)}

      {likes !== null && likes !== undefined && (
        <p className="text-gray-500 mt-1">
          ❤️ {likes} curtidas
        </p>
      )}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-3 rounded-lg transition"
        >
          Ver na Shopee
        </a>
      )}
    </div>
  );
}