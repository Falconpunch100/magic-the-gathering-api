import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import backEndAPI from "../api/back-end.js"
import DeckList from "../DeckList.js"
import SearchCard from "../SearchCard.js"

function EditPage() {
    const { deckID } = useParams()
    useEffect(() => {
        async function getDeckByID() {
            const response = await backEndAPI.get(`decks/${deckID}`)
            setDeckData(response.data)
        }
        getDeckByID()
    }, [deckID]);
    const [deckData, setDeckData] = useState({
        name: "", count: 0, cards: [], userID: 4, id: -1
    })
    return (
        <section className="deckMaker">
            <SearchCard deckData={deckData} setDeckData={setDeckData}></SearchCard>
            <DeckList deckData={deckData}></DeckList>
        </section>
    )
}

export default EditPage;