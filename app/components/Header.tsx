export default function Header() {
  return (
    <header className="bg-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        <h1 className="text-3xl font-bold text-white">
          ShopHub
        </h1>

        <input
          type="text"
          placeholder="Pesquisar produtos..."
          className="w-96 p-3 rounded-lg text-black"
        />

        <button className="bg-white text-orange-500 font-bold px-6 py-3 rounded-lg">
          Pesquisar
        </button>

      </div>
    </header>
  );
}