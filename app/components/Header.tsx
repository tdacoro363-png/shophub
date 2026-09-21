"use client";

import { useState } from "react";

export default function Header() {
  const [busca, setBusca] = useState("");

  function pesquisar(e: React.FormEvent) {
    e.preventDefault();

    const termo = busca.trim();

    if (!termo) {
      window.location.href = "/";
      return;
    }

    window.location.href = `/?q=${encodeURIComponent(termo)}`;
  }

  return (
    <header className="bg-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto p-4">

        <div className="flex items-center justify-between gap-4">

          <h1 className="text-3xl font-bold text-white whitespace-nowrap">
            ShopHub
          </h1>

          <form
            onSubmit={pesquisar}
            className="flex flex-1 max-w-2xl gap-2"
          >
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar produtos..."
              className="w-full p-3 rounded-lg bg-white text-black outline-none shadow-sm"
            />

            <button
              type="submit"
              className="bg-white text-orange-500 font-bold px-6 py-3 rounded-lg hover:bg-gray-100"
            >
              Pesquisar
            </button>
          </form>

        </div>

        <p className="text-white text-sm text-center mt-2">
          🛠️ Estamos em manutenção para melhorar a atualização dos produtos. Voltamos em breve!
        </p>

      </div>
    </header>
  );
}