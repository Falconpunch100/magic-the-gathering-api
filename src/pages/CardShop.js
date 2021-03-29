import CardPicker from "../CardPicker.js"
import DeckList from "../DeckList.js"
import { useState } from "react"
function CardShop() {
    let [deck, setDeck] = useState([])
    return (
        <section id="deckMaker">
            <CardPicker deck={deck} setDeck={setDeck}></CardPicker>
            <DeckList deck={deck} setDeck={setDeck}></DeckList>
        </section>
    )
}

export default CardShop;