import { useEffect, useState } from "react"
import "./DeckList.css"
import DeckCard from "./DeckCard.js"
import backEndAPI from "../src/api/back-end.js"

function DeckList({ deckData }) {
  let [name, setName] = useState("")
  let [myDeck, setMyDeck] = useState([])
  useEffect(() => {
    setMyDeck(deckData.cards)
    setName(deckData.name)
  }, [deckData])

  function addCardToDeck(newCard) {
    let copy = myDeck.slice()
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
    setMyDeck(copy)
  }

  function removeCardFromDeck(cardToRemove) {
    let copy = myDeck.slice()
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
    setMyDeck(copy)
  }

  function resetDeck() {
    setMyDeck([])
  }

  async function saveDeck(name) {
    let copy = myDeck.slice()
    let sum = 0;
    for (let i = 0; i < copy.length; i++) {
      const element = copy[i];
      sum += element.count;
    }
    let userID = 4;
    const finalDeck = { name, count: sum, cards: copy, userID }
    if (deckData.id > 0) {
      const response = await backEndAPI.put(`/decks/${deckData.id}`, finalDeck)
      console.log(response)
    }
    else {
      const response = await backEndAPI.post("/decks", finalDeck)
      console.log(response)
    }
  }

  return (
      <div id="right">
        <h2 id="deckName">{deckData.name}</h2>
        <div id="save-and-reset">
          <label>Deck Name</label>
          <input value={name} onChange={(e) => { setName(e.target.value) }} id="" placeholder="Please name your deck."></input>
          <button id="reset" onClick={resetDeck}>Reset</button>
          <button id="save" onClick={() => {saveDeck(name)}}>Save</button>
          <button id="edit" onClick={() => {}}>Edit</button>
        </div>

        <section className="deckGrid">
          {myDeck.map((card) => {
            return (
              <DeckCard key={card.name} card={card} addCardToDeck={addCardToDeck} removeCardFromDeck={removeCardFromDeck}></DeckCard>
            )
          })}
        </section>
      </div>
  )
}
export default DeckList;