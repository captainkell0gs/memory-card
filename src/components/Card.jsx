export default function Card({ card, handleCardClick }) {
    return (
        <button
        className="card"
        type="button"
        onClick={() => handleCardClick(card.id)}
        >
        <div className="card-image-wrap">
            <img src={card.image} alt={card.name} />
        </div>

        <div className="card-body">
            <p>{card.name}</p>
        </div>
        </button>
    );
}