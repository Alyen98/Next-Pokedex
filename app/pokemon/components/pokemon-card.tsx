import Image from "next/image";
import Link from "next/link";

// Dicionário de cores para as badges dos cards
const typeColors: Record<string, string> = {
    normal: "bg-[#A8A77A]", fire: "bg-[#EE8130]", water: "bg-[#6390F0]", grass: "bg-[#7AC74C]",
    electric: "bg-[#F7D02C]", ice: "bg-[#96D9D6]", fighting: "bg-[#C22E28]", poison: "bg-[#A33EA1]",
    ground: "bg-[#E2BF65]", flying: "bg-[#A98FF3]", psychic: "bg-[#F95587]", bug: "bg-[#A6B91A]",
    rock: "bg-[#B6A136]", ghost: "bg-[#735797]", dragon: "bg-[#6F35FC]", dark: "bg-[#705746]",
    steel: "bg-[#B7B7CE]", fairy: "bg-[#D685AD]"
};

type PokemonCardProps = {
    name: string;
    url: string;
};

export default async function PokemonCard({ name, url }: PokemonCardProps) {
    // Busca os detalhes para pegar os tipos
    const res = await fetch(url);
    const pokemon = await res.json();

    const id = pokemon.id.toString();
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
        <Link
            href={`/pokemon/${id}`}
            className="group flex flex-col overflow-hidden bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
            {/* Topo Cinza Claro */}
            <div className="flex h-44 items-center justify-center bg-[#F2F2F2] p-4">
                <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-110">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 160px"
                    />
                </div>
            </div>

            {/* Informações Brancas */}
            <div className="p-4">
                <span className="text-xs font-bold text-gray-400">
                    #{id.padStart(3, '0')}
                </span>
                <h2 className="mt-1 text-lg font-bold capitalize text-gray-900">
                    {name}
                </h2>

                <div className="mt-2 flex gap-1.5">
                    {pokemon.types.map((t: { type: { name: string } }) => (
                        <span
                            key={t.type.name}
                            className={`px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${typeColors[t.type.name] || 'bg-gray-500'}`}
                        >
                            {t.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}