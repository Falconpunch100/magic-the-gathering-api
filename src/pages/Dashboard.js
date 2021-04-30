import backEndAPI from "../api/back-end.js";
import DeckList from "../DeckList.js"
import ".././DeckList.css"
import { useState, useEffect } from "react"
import Navbar from "../Navbar.js"

function Dashboard() {
    const userID = localStorage.getItem("userID")
    const [allDecks, setAllDecks] = useState([])
    useEffect(() => {
        async function getUserDecks() {
            const response = await backEndAPI.get(`/decks?userID=${userID}`)
            setAllDecks(response.data)
        }
        getUserDecks()
    }, [userID])
    return (
        <>
        <Navbar></Navbar>
        <section id="deck-dashboard">
            {allDecks.length <= 0 ? <div id="no-deck">
                <h2>You don't have any decks yet... Start making some by clicking on "Create Deck" above!</h2>
            </div> : null}
            {allDecks.map((oneDeck) => {
                return <DeckList onDashboard={true} key={oneDeck.id} deckData={oneDeck}></DeckList>
            })}
        </section>
        </>
    )
}

export default Dashboard;