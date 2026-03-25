export async function fetchCharacterCards(limit = 12) {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (!response.ok) {
        throw new Error("Failed to fetch characters");
    }

    const data = await response.json();

    return data.results.slice(0, limit).map((character) => ({
        id: character.id,
        name: character.name,
        image: character.image
    }))
}