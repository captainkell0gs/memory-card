export default function ScoreBoard({ score, bestScore }) {
    return (
        <section className="scoreboard">
        <div className="score-card score-card--current">
            <span className="score-label">Current Score</span>
            <span className="score-value">{score}</span>
        </div>

        <div className="score-card score-card--best">
            <span className="score-label">Best Score</span>
            <span className="score-value">{bestScore}</span>
        </div>
        </section>
    );
}