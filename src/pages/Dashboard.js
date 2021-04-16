import backEndAPI from "../api/back-end.js";
import DeckList from "../DeckList.js"
import ProtectedRoute from "../ProtectedRoute.js"
import { useState, useEffect } from "react"

function Dashboard() {
    const [allDecks, setAllDecks] = useState([])
    useEffect(() => {
        async function getUserDecks() {
            const response = await backEndAPI.get("/decks?userID=4")
            //TODO: Change "4" to be dependant on whoever is logged in at the time.
            setAllDecks(response.data)
        }
        getUserDecks()
    }, []) 
    return (
        <section id="deck-dashboard">
            {allDecks.map((oneDeck) => {
                return <DeckList key={oneDeck.id} deckData={oneDeck}></DeckList>
            })}
        </section>
    )
}

export default Dashboard;