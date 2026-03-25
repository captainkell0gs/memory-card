import shuffleArray from "../utils/shuffle";

export async function fetchCharacterCards(limit = 12) {
    const randomPage = Math.floor(Math.random() * 42) + 1;

    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${randomPage}`);

    if (!response.ok) {
        throw new Error("Failed to fetch characters");
    }

    const data = await response.json();

    return shuffleArray(data.results).slice(0, limit)
        .map((character) => ({
            id: character.id,
            name: character.name,
            image: character.image,
        }));
}