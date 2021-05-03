import { useRouteMatch, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import backEndAPI from "../api/back-end.js"
import DeckList from "../DeckList.js"
import SearchCard from "../SearchCard.js"
import Navbar from "../Navbar.js"
import {HOMEPAGE} from "../constants/routes.js"

function EditPage() {
    const {path} = useRouteMatch()
    const deckID = path.slice(path.indexOf("/", 1) + 1)
    const userID = localStorage.getItem("userID")
    const history = useHistory()
    useEffect(() => {
        async function getDeckByID() {
            const response = await backEndAPI.get(`decks/${deckID}`)
            if (Number(userID) === Number(response.data.userID)) {
                setDeckData(response.data)
            }
            else {
                history.push(HOMEPAGE)
                alert("Sorry, but you were trying to edit a deck that does not belong to you.")
            }
        }
        getDeckByID()
    }, [deckID, userID, history]);
    const [deckData, setDeckData] = useState({
        name: "", count: 0, cards: [], userID, id: -1
    })
    return (
        <section className="deckMaker">
            <Navbar></Navbar>
            <SearchCard deckData={deckData} setDeckData={setDeckData}></SearchCard>
            <DeckList deckData={deckData} setDeckData={setDeckData}></DeckList>
        </section>
    )
}

export default EditPage;