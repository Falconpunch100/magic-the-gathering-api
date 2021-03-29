import { useParams, useHistory } from "react-router-dom"
import {useEffect, useState} from "react"
import backEndAPI from "../api/back-end.js"
import DeckList from "../DeckList.js"
function EditPage() {
    const {deckID} = useParams()
    useEffect(() => {
        async function getDeckByID() {
            const response = await backEndAPI.get(`decks/${deckID}`)
            setDeckData(response.data)
        }
        getDeckByID()
    }, []); 
    const [ deckData, setDeckData ] = useState({
        name: "", count: 0, cards: [], userID: 4, id: -1
    })
    return(
        <div>
            <DeckList deckData={deckData}></DeckList>
        </div>
    )
}

export default EditPage;