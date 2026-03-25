export default function Card({ card, handleCardClick}) {
    return (
        <button
            className="card" 
            type="button" 
            onClick={() => handleCardClick(card.id)}
        >
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>
        </button>
    );
}