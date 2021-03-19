function DeckCard({card, addCardToDeck, removeCardFromDeck}) {
    return (
        <div className="deckCard">
        <p>{card.name}</p>
        <p>{card.count}x</p>
        <img src={card.imageUrl} alt="card" />
        <div>
        <button className="add" type="button" onClick={() => {addCardToDeck(card)}}>+</button>
        <button className="remove" type="button" onClick={() => {removeCardFromDeck(card)}}>-</button>
        </div>
      </div>
    )
}


export default DeckCard;