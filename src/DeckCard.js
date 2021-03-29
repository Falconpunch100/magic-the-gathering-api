import generic from "./generic-card-front.jpg"

function DeckCard({card, addCardToDeck, removeCardFromDeck}) {
    return (
        <div className="deckCard">
        <p>{card.name}</p>
        <p>{card.count}x</p>
        {card.imageUrl === undefined ? <img className="generic" src={generic} alt="generic card front" />  : <img src={card.imageUrl} alt={card.name} /> }
        <div>
        <button className="add" type="button" onClick={() => {addCardToDeck(card)}}>+</button>
        <button className="remove" type="button" onClick={() => {removeCardFromDeck(card)}}>-</button>
        </div>
      </div>
    )
}


export default DeckCard;