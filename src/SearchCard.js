import { useState } from "react"
import mtgAPI from "./api/mtg-api.js"
import Card from "./Card.js"
import Loader from "./Loader.js"

function SearchCard({deckData, setDeckData}) {
    const [cards, setCards] = useState([])
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [vis, setVis] = useState(false)
    async function filterCards() {
        setVis(true)
        const response = await mtgAPI.get("/cards", {
            params: {
                name: name, text: desc
            }
        })
        const noDuplicates = removeDuplicates((card) => {return (card.name)}, response.data.cards)
        console.log(noDuplicates)
        setCards(noDuplicates)
        setVis(false)
    }

    function addCardToDeck(newCard) {
        let copy = deckData.cards.slice()
        let searchForCard = copy.find((deckCard) => {
            if (deckCard.id === newCard.id) {
                return true;
            }
            else {
                return false;
            }
        })
        console.log({ searchForCard })
        if (searchForCard !== undefined) {
            searchForCard.count++;
        }
        else {
            newCard.count = 1;
            copy.push(newCard)
        }
        setDeckData({
            ...deckData, cards: copy
        })
    }

    function removeCardFromDeck(cardToRemove) {
        let copy = deckData.cards.slice()
        let searchForCard = copy.findIndex((deckCard) => {
            if (deckCard.id === cardToRemove.id) {
                return true;
            }
            else {
                return false;
            }
        })
        if (searchForCard !== -1) {
            let deletedCard = copy[searchForCard]
            deletedCard.count--;
            if (deletedCard.count === 0) {
                copy.splice(searchForCard, 1)
            }
        }
        setDeckData({
            ...deckData, cards: copy
        })
    }

    function removeDuplicates(keyFn, array) {
        var mySet = new Set();
        return array.filter(function(x) {
            var key = keyFn(x), isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
            return isNew;
        });
    }

    return (
        <div id="left">
            <Loader visible={vis}></Loader>
            <form onSubmit={(e) => {
                e.preventDefault()
                filterCards()
            }}>
                <label htmlFor="nameOfCard">Search Card Name</label>
                <input type="text" placeholder="Name of Card" id="nameOfCard" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                <label htmlFor="cardDesc">Search Card Description</label>
                <input type="text" placeholder="Card Description" id="cardDesc" value={desc} onChange={(e) => { setDesc(e.target.value) }}></input>
                <button type="submit">Find Cards</button>
            </form>
            <div className="cardGrid">
                {cards.map((card) => {
                    return (
                        <Card key={card.id} addCardToDeck={addCardToDeck} removeCardFromDeck={removeCardFromDeck} name={card.name} cmc={card.cmc} power={card.power} text={card.text} toughness={card.toughness} imageUrl={card.imageUrl} id={card.id}></Card>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchCard;