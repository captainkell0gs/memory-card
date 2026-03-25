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
    const [gameWon, setGameWon] = useState(false);
    const [showWinModal , setShowWinModal] = useState(false);

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

    useEffect(() => {
        loadCards();
    }, []);

    async function resetGame() {
        setScore(0);
        setClickedCards([]);
        setGameWon(false);
        await loadCards();
    }

    async function handleCloseModal() {
        setShowWinModal(false);
        await resetGame();
    }

    async function handleCardClick(id) {
        if (gameWon || loading) return;

        if (clickedCards.includes(id)) {
            await resetGame();
            return;
        }

        const updatedClickedCards = [...clickedCards, id];
        const newScore = score + 1;

        setClickedCards(updatedClickedCards);
        setScore(newScore);
        setBestScore((prevBest) => (
            newScore > prevBest ? newScore : prevBest
        ));

        if (updatedClickedCards.length === cards.length) {
            setGameWon(true);
            setShowWinModal(true);
            return;
        }

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

            {showWinModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>You Win!</h2>
                        <p>You clicked every card without repeating!</p>

                        <button
                            type="button"
                            className="modal-btn"
                            onClick={handleCloseModal}
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}

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