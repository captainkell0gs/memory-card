export default function ScoreBoard({score, bestScore}) {
    return (
        <section className="score-board"> 
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
        </section>
    )
}