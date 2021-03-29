import "./Card.css"
import generic from "./generic-card-front.jpg"

function Card({ addCardToDeck, removeCardFromDeck, name, cmc, power, toughness, imageUrl, id, text }) {
    return (
        <div className="scene scene--card">
            <h2 style={{color: "white"}}>{name}</h2>
            <h5>Mana Cost: {cmc}</h5>
             {power === undefined ? null : <h6>Power: {power}</h6>}
             {toughness === undefined ? null : <h6>Toughness: {toughness}</h6>}
             {imageUrl === undefined ? <img className="generic" src={generic} alt="generic card front" />  : <img src={imageUrl} alt={name} /> }
             {imageUrl === undefined ? <p>{text}</p> : null }
            <button type="button" className="add" onClick={(e) => {addCardToDeck({name, cmc, power, toughness, imageUrl, id})}}>Add Card</button>
            <button type="button" className="remove" onClick={(e) => {removeCardFromDeck({name, cmc, power, toughness, imageUrl, id})}}>Remove Card</button>
            {/* <div className="card" onClick={(e) => {
                 e.target.parentNode.classList.toggle('is-flipped')
            }}>
                 <div className="card__face card__face--front"></div>
                <div style={{backgroundImage: `url(${imageUrl})`}} class="card__face card__face--back"></div>
            </div> */}
        </div>
    )
}

export default Card;