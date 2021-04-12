import "./Lightbox.css"
import { createPortal } from "react-dom"
import { useEffect, useRef } from "react"
function Lightbox({ dismissFunction, addCardToDeck, removeCardFromDeck, name, cmc, power, toughness, imageUrl, id, text }) {
    const descBox = useRef(null)
    useEffect(() => {
        function handleOutsideClick(e) {
            if (descBox.current && !descBox.current.contains(e.target)) {
                dismissFunction()
            }
        }
        document.addEventListener("click", handleOutsideClick)
        return (() => {
            document.removeEventListener("click", handleOutsideClick)
        })
    }, [descBox, dismissFunction])
    return createPortal(<article ref={descBox} className="lightbox-data">
        <div>
            <img src={imageUrl} alt={name} />
        </div>
        <div className="info">
            <h3>{name}</h3>
            <h5>{text}</h5>
            <h6>Total Mana Cost: {cmc}</h6>
            <h6>Power: {power}</h6>
            <h6>Toughness: {toughness}</h6>
            <div>
                <button type="button" className="add" onClick={(e) => { addCardToDeck({ name, cmc, power, toughness, imageUrl, id }) }}>Add Card</button>
                <button type="button" className="remove" onClick={(e) => { removeCardFromDeck({ name, cmc, power, toughness, imageUrl, id }) }}>Remove Card</button>
            </div>
        </div>
    </article>, document.getElementById("Lightbox"))
}

export default Lightbox;