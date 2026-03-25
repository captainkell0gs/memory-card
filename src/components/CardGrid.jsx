import Card from "./Card"

export default function CardGrid({cards, handleCardClick}) {
    return (
        <section className="card-grid">
            {cards.map((card) => (
                <Card 
                    key={card.id} 
                    card={card} 
                    handleCardClick={handleCardClick} 
                />
            ))}
        </section>
    )
}