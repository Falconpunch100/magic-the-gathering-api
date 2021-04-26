import CardPicker from "../CardPicker.js"
import DeckList from "../DeckList.js"
import {useState} from "react"
import Navbar from "../Navbar.js"
function CardShop() {
    const userID = localStorage.getItem("userID")
    const [deckData, setDeckData ] = useState({
        name: "", count: 0, cards: [], userID
    })
    return (
        <section className="deckMaker">
            <Navbar></Navbar>
            <CardPicker deckData={deckData} setDeckData={setDeckData}></CardPicker>
            <DeckList deckData={deckData} ></DeckList>
        </section>
    )
}

export default CardShop;