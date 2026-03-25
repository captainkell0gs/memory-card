import { useEffect, useState } from "react";
import CardGrid from "./components/CardGrid";
import ScoreBoard from "./components/ScoreBoard";
import shuffleArray from "./utils/shuffle";
import { fetchCharacterCards } from "./api/rickMorty";

export default function App() {
    const [cards, setCards] = useState([]); 
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadCards () {
            try {
                setLoading(true);
                setError("");

                const characters = await fetchCharacterCards(12);
                setCards(shuffleArray(characters));
            } catch (error) {
                setError(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        loadCards();
    }, []);

    function handleCardClick(id) {
        if (clickedCards.includes(id)) {
            setScore(0);
            setClickedCards([]);
            setCards((prev) => shuffleArray(prev));
            return;
        }

        setClickedCards((prev) => [...prev, id]);

        setScore((prevScore) => {
            const newScore = prevScore + 1;

            setBestScore((prevBest) => 
                newScore > prevBest ? newScore : prevBest
            );

            return newScore;
        });

        setCards((prev) => shuffleArray(prev));
    }

    return (
        <main>
            <h1>Rick & Morty Memory Game</h1>
            <p className="subtitle">Get points by clicking each character only once.</p>

            <ScoreBoard score={score} bestScore={bestScore} />

            <section className="game-area">
            {loading && <p className="loading">Loading cards...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <CardGrid
                cards={cards}
                handleCardClick={handleCardClick}
                />
            )}
            </section>
        </main>
    );
}