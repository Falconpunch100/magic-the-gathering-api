import backEndAPI from "../api/back-end.js";
import DeckList from "../DeckList.js"
import { useState, useEffect } from "react"

function Dashboard() {
    const [name, setName] = useState("")
    const [allDecks, setAllDecks] = useState([])
    useEffect(() => {
        async function getUserDecks() {
            const response = await backEndAPI.get("/decks?userID=4")
            //TODO: Change "4" to be dependant on whoever is logged in at the time.
            console.log(response.data)
            setAllDecks(response.data)
        }
        getUserDecks()
    }, []) 
    return (
        <section id="deck-dashboard">
            {allDecks.map((oneDeck) => {
                return <DeckList deckName={oneDeck.name} deck={oneDeck.cards}></DeckList>
            })}
        </section>
    )
}

export default Dashboard;