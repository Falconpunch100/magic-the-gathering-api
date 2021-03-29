import mtgAPI from "./api/mtg-api.js"
import { useEffect, useState } from "react"
import "./DeckList.css"
import Card from "./Card.js"

function CardPicker({ deck, setDeck }) {
    let [sets, setSets] = useState([])
    let [chosenSet, setChosenSet] = useState("")
    let [cards, setCards] = useState([])
    useEffect(() => {
        async function fetchSetNames() {
            const response = await mtgAPI.get("sets")
            let setNameArray = response.data.sets.map((set) => {
                return { name: set.name, code: set.code };
            })
            setSets(setNameArray)
        }
        fetchSetNames();
    }, []);

    function addCardToDeck(newCard) {
        let copy = deck.slice()
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
        setDeck(copy)
    }

    function removeCardFromDeck(cardToRemove) {
        let copy = deck.slice()
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
        setDeck(copy)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await mtgAPI.get(`sets/${chosenSet}/booster`)
        console.log(response.data)
        let cardArray = response.data.cards.map((card) => {
            return { cmc: card.cmc, name: card.name, id: card.id, imageUrl: card.imageUrl, power: card.power, toughness: card.toughness, text: card.text }
        })
        setCards(cardArray)
    }

    return (
        <div id="left">
            <form onSubmit={handleSubmit}>
                <label htmlFor="sets">Choose a set:</label>
                <select name="sets" onChange={(e) => { setChosenSet(e.target.value) }}>
                    <option value=""></option>
                    {sets.map((set) => {
                        return (
                            <option key={set.code} value={set.code}>{set.name}</option>
                        )
                    })}
                </select>
                <button type="submit">Get Booster Pack</button>
            </form>
            <div id="cardGrid">
                {cards.map((card) => {
                    return (
                        <Card key={card.id} addCardToDeck={addCardToDeck} removeCardFromDeck={removeCardFromDeck} name={card.name} cmc={card.cmc} power={card.power} text={card.text} toughness={card.toughness} imageUrl={card.imageUrl} id={card.id}></Card>
                    )
                })}
            </div>
        </div>
    )
}

export default CardPicker;