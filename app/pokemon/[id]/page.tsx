import Image from "next/image";
import BackButton from "../components/back-button";

const bgColors: Record<string, string> = {
    normal: "bg-stone-400", fire: "bg-red-500", water: "bg-blue-500", grass: "bg-green-500",
    electric: "bg-yellow-400", ice: "bg-cyan-400", fighting: "bg-orange-600", poison: "bg-purple-500",
    ground: "bg-amber-600", flying: "bg-indigo-400", psychic: "bg-pink-400", bug: "bg-lime-500",
    rock: "bg-stone-600", ghost: "bg-violet-600", dragon: "bg-indigo-600", dark: "bg-neutral-800",
    steel: "bg-slate-500", fairy: "bg-pink-300"
};

export default async function PokemonDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!res.ok) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-400">Pokémon não encontrado.</h1>
            </div>
        );
    }

    const pokemon = await res.json();
    const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

    const primaryType = pokemon.types[0].type.name;
    const bgColor = bgColors[primaryType] || "bg-gray-500";

    return (
        <main className={`flex min-h-screen flex-col ${bgColor}`}>

            {/* Header com Informações */}
            <div className="p-8 pb-32 text-white sm:px-12 md:px-24">
                <BackButton />

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold capitalize tracking-tight drop-shadow-md sm:text-5xl">
                            {pokemon.name}
                        </h1>
                        <div className="mt-3 flex gap-2">
                            {pokemon.types.map((t: { type: { name: string } }) => (
                                <span
                                    key={t.type.name}
                                    className="rounded-full bg-white/30 px-4 py-1 text-sm font-semibold capitalize backdrop-blur-sm"
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <span className="text-2xl font-extrabold drop-shadow-md sm:text-3xl">
                        #{String(pokemon.id).padStart(3, '0')}
                    </span>
                </div>
            </div>

            {/* Bottom Sheet com Peso e Altura */}
            <div className="relative mt-8 flex flex-1 flex-col rounded-t-[3rem] bg-white px-8 pt-16 sm:px-12 md:px-24">

                {/* Imagem do Pokémon flutuando */}
                <div className="absolute -top-48 left-1/2 z-10 h-64 w-64 -translate-x-1/2 sm:h-72 sm:w-72">
                    <Image
                        src={imageUrl}
                        alt={pokemon.name}
                        fill
                        className="object-contain drop-shadow-lg"
                        priority
                        sizes="(max-width: 768px) 256px, 288px"
                    />
                </div>

                {/* Altura e Peso Simplificados */}
                <div className="mt-12 flex w-full max-w-md justify-around self-center pb-12 text-center sm:mt-16">
                    <div className="flex flex-col items-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">Altura</p>
                        <p className="mt-2 text-3xl font-black text-gray-800">{pokemon.height / 10} m</p>
                    </div>

                    {/* pequena linha divisória vertical pq sim */}
                    <div className="w-px bg-gray-200"></div>

                    <div className="flex flex-col items-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">Peso</p>
                        <p className="mt-2 text-3xl font-black text-gray-800">{pokemon.weight / 10} kg</p>
                    </div>
                </div>
            </div>
        </main>
    );
}