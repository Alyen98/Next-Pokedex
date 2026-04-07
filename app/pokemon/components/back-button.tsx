"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 font-bold text-white transition-opacity hover:opacity-75"
        >
            &larr; Voltar
        </button>
    );
}