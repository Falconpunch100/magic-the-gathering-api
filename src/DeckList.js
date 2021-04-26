import { Link, useRouteMatch } from "react-router-dom"
import * as ROUTES from "./constants/routes.js"
import { useEffect, useState } from "react"
import "./DeckList.css"
import DeckCard from "./DeckCard.js"
import backEndAPI from "../src/api/back-end.js"

function DeckList({ deckData }) {
  const { path } = useRouteMatch()
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
        console.log(copy)
      }
    }
    setMyDeck(copy)
  }

  async function deleteDeck() {
    await backEndAPI.delete(`/decks/${deckData.id}`)
    setMyDeck([])
  }

  async function saveDeck(name) {
    let copy = myDeck.slice()
    let sum = 0;
    for (let i = 0; i < copy.length; i++) {
      const element = copy[i];
      sum += element.count;
    }
    let userID = localStorage.getItem("userID");
    const finalDeck = { name, count: sum, cards: copy, userID }
    if (deckData.id > 0) {
      await backEndAPI.put(`/decks/${deckData.id}`, finalDeck)
    }
    else {
      await backEndAPI.post("/decks", finalDeck)
    }
  }

  return (
    <>
    {
      myDeck.length > 0 ?
        <div id="right">
          <h2 id="deckName">{deckData.name}</h2>
          <div id="save-and-reset">
            <label>Deck Name</label>
            <input value={name} onChange={(e) => { setName(e.target.value) }} id="" placeholder="Please name your deck."></input>
            <button id="save" onClick={() => { saveDeck(name) }}>Save</button>
            {path.includes("edit") ? null : <Link to={`${ROUTES.EDIT}/${deckData.id}`}><button id="edit">Edit</button></Link>}
            <button id="reset" onClick={deleteDeck}>Delete</button>
          </div>

          <section className="deckGrid">
            {myDeck.map((card) => {
              return (
                <DeckCard key={card.name} card={card} addCardToDeck={addCardToDeck} removeCardFromDeck={removeCardFromDeck}></DeckCard>
              )
            })}
          </section>
        </div> : null
    }
    </>
  )
}
export default DeckList;