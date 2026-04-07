import PokemonCard from "./pokemon/components/pokemon-card";
import Link from "next/link";

type SearchParams = Promise<{ page?: string; search?: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const searchQuery = params.search?.toLowerCase() || "";
  const limit = 20;
  const offset = (page - 1) * limit;

  let pokemons: { name: string; url: string }[] = [];
  let error = false;

  try {
    if (searchQuery) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
      if (!res.ok) throw new Error("ão encontrado");
      const data = await res.json();
      pokemons = [{ name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${data.id}/` }];
    } else {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await res.json();
      pokemons = data.results;
    }
  } catch (e) {
    console.error(e);
    error = true;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-center text-4xl font-extrabold tracking-tight text-gray-800">
          Pokédex
        </h1>

        <form className="mb-12 flex flex-wrap justify-center gap-3" method="GET" action="/">
          <input
            type="text"
            name="search"
            placeholder="Procure por nome exato ou ID"
            defaultValue={searchQuery}
            className="w-full max-w-md border-b-2 border-gray-300 bg-transparent p-3 text-lg text-gray-700 outline-none transition-colors focus:border-indigo-500"
          />
          <button
            type="submit"
            className="rounded bg-indigo-500 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-600"
          >
            Pesquisar
          </button>
          {searchQuery && (
            <Link href="/" className="flex items-center justify-center rounded bg-gray-200 px-8 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-300">
              Limpar
            </Link>
          )}
        </form>

        {error ? (
          <p className="text-center text-xl font-medium text-gray-500">Pokémon Não Encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pokemons.map((p: { name: string; url: string }) => (
              <PokemonCard key={p.name} name={p.name} url={p.url} />
            ))}
          </div>
        )}

        {!searchQuery && !error && (
          <div className="mt-16 flex justify-center gap-4">
            {page > 1 && (
              <Link
                href={`/?page=${page - 1}`}
                className="rounded bg-gray-800 px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-900"
              >
                &larr; Anterior
              </Link>
            )}
            <Link
              href={`/?page=${page + 1}`}
              className="rounded bg-gray-800 px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-900"
            >
              Próximo &rarr;
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}