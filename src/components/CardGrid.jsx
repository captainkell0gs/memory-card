import Card from "./card";

export default function CardGrid({card, handleCardClick}) {
    return (
        <section className="card-grid">
            {card.map((card) => (
                <Card 
                    key={card.id} 
                    card={card} 
                    handleCardClick={handleCardClick} 
                />
            ))}
        </section>
    )
}