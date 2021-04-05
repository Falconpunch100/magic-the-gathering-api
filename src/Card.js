import "./Card.css"
import generic from "./generic-card-front.jpg"
import Lightbox from "./Lightbox.js"
import { useState, useEffect } from "react"

function Card({ addCardToDeck, removeCardFromDeck, name, cmc, power, toughness, imageUrl, id, text }) {
    const [lightVis, setLightVis] = useState(false)
    useEffect(() => {
        if (lightVis === true) {
            document.getElementById("root").style.filter = "blur(3px)"
        }
        else {
            document.getElementById("root").style.filter = ""
        }
    }, [lightVis])
    return (
        <div className="scene scene--card">
            {lightVis === false ? null : <Lightbox addCardToDeck={addCardToDeck} removeCardFromDeck={removeCardFromDeck} name={name} cmc={cmc} power={power} toughness={toughness} imageUrl={imageUrl} id={id} text={text}></Lightbox>}
            <h3>{name}</h3>
            <h5>Mana Cost: {cmc}</h5>
            {power === undefined ? null : <h6>Power: {power}</h6>}
            {toughness === undefined ? null : <h6>Toughness: {toughness}</h6>}
            <div className="cardIMG" onClick={() => { setLightVis(true) }}>
                {imageUrl === undefined ? <img className="generic" src={generic} alt="generic card front" /> : <img src={imageUrl} alt={name} />}
                {imageUrl === undefined ? <p>{text}</p> : null}
            </div>
            <button type="button" className="add" onClick={(e) => { addCardToDeck({ name, cmc, power, toughness, imageUrl, id }) }}>Add Card</button>
            <button type="button" className="remove" onClick={(e) => { removeCardFromDeck({ name, cmc, power, toughness, imageUrl, id }) }}>Remove Card</button>
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