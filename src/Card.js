import "./Card.css"
import generic from "./generic-card-front.jpg"
import Lightbox from "./Lightbox.js"
import { useState, useEffect } from "react"

function Card({ addCardToDeck, removeCardFromDeck, name, cmc, power, toughness, imageUrl, id, text }) {
    const trueImageUrl = imageUrl === undefined ? generic : imageUrl;
    const [lightVis, setLightVis] = useState(false)
    const [getter, setGetter] = useState("")
    function dismissFunction() {
        setLightVis(false)
    }
    useEffect(() => {
        if (lightVis === true) {
            document.getElementById("root").style.filter = "blur(3px) brightness(50%)"
            document.getElementById("Lightbox").style.display = "initial"

        }
        else {
            document.getElementById("root").style.filter = ""
            document.getElementById("Lightbox").style.display = "none"
        }
    }, [lightVis])
    return (
        <div className="scene scene--card">
            {getter }
            {lightVis === false ? null : <Lightbox dismissFunction={dismissFunction} addCardToDeck={addCardToDeck} removeCardFromDeck={removeCardFromDeck} name={name} cmc={cmc} power={power} toughness={toughness} imageUrl={trueImageUrl} id={id} text={text}></Lightbox>}
            <h3>{name}</h3>
            <h5>Mana Cost: {cmc}</h5>
            {power === undefined ? null : <h6>Power: {power}</h6>}
            {toughness === undefined ? null : <h6>Toughness: {toughness}</h6>}
            <div className="cardIMG" onClick={() => { setLightVis(true) }}>
                <img src={trueImageUrl} alt={name} />

            </div>
            <button type="button" className="add" onClick={(e) => { addCardToDeck({ name, cmc, power, toughness, imageUrl, id }) }}>Add Card</button>
            <button type="button" className="remove" onClick={(e) => { removeCardFromDeck({ name, cmc, power, toughness, imageUrl, id }) }}>Remove Card</button>
        </div>
    )
}

export default Card;