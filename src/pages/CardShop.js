import CardPicker from "../CardPicker.js"
import DeckList from "../DeckList.js"
import { useState } from "react"
function CardShop() {
    // let [deck, setDeck] = useState([])
    const [deckData, setDeckData ] = useState({
        name: "", count: 0, cards: [], userID: 4, id: -1
    })
    return (
        <section className="deckMaker">
            <CardPicker deckData={deckData} setDeckData={setDeckData}></CardPicker>
            <DeckList deckData={deckData} ></DeckList>
        </section>
    )
}

// "name": "Deck1",
// "count": 40,
// "cards": [],
// "userID": 1,
// "id": 1

export default CardShop;