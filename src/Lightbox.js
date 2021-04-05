import "./Lightbox.css"
import { createPortal } from "react-dom"
function Lightbox({ addCardToDeck, removeCardFromDeck, name, cmc, power, toughness, imageUrl, id, text }) {
    return createPortal(<article className="lightbox-data">
        <div>
            <img src={imageUrl} alt={name} />
        </div>
        <div>
            <h3>{name}</h3>
            <h5>{text}</h5>
            <h6>Total Mana Cost: {cmc}</h6>
            <h6>Power: {power}</h6>
            <h6>Toughness: {toughness}</h6>
        </div>
    </article>, document.getElementById("Lightbox"))
}

export default Lightbox;