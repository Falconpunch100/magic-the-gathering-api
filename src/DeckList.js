import mtgAPI from "./api/mtg-api.js"
import { useEffect, useState } from "react"
import "./DeckList.css"
import Card from "./Card.js"
import DeckCard from "./DeckCard.js"
import backEnd from "../src/api/back-end.js"
function DeckList({ deck, setDeck }) {
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
      //take the "sets" variable and map it inside the select variable (line 26) options (with the value tag and text in the middle)
    }
    fetchSetNames();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault()
    const response = await mtgAPI.get(`sets/${chosenSet}/booster`)
    console.log(response.data)
    let cardArray = response.data.cards.map((card) => {
      return { cmc: card.cmc, name: card.name, id: card.id, imageUrl: card.imageUrl, power: card.power, toughness: card.toughness }
    })
    setCards(cardArray)
  }

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

  function resetDeck() {

    setDeck([])
  }

  async function saveDeck() {
    let copy = deck.slice()
    let name = "testDeck"
    let sum = 0;
    for (let i = 0; i < copy.length; i++) {
      const element = copy[i];
      sum += element.count;
    }
    let userID = 4;
    const finalDeck = { name, count: sum, cards: copy, userID }
    const response = await backEnd.post("/decks", finalDeck)
    console.log(response.data)
  }
  return (
    <section id="deckMaker">
      <div id="left">
        {/* <Card></Card> */}
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
              <Card key={card.id} addCardToDeck={addCardToDeck} removeCardFromDeck={removeCardFromDeck} name={card.name} cmc={card.cmc} power={card.power} toughness={card.toughness} imageUrl={card.imageUrl} id={card.id}></Card>
            )
          })}
        </div>
      </div>
      <div id="right">
        <div id="save-and-reset">
          <button id="reset" onClick={resetDeck}>Reset</button>
          <button id="save" onClick={saveDeck}>Save</button>
        </div>

        <section className="deckGrid">
          {deck.map((card) => {
            return (
              <DeckCard key={card.name} card={card} addCardToDeck={addCardToDeck} removeCardFromDeck={removeCardFromDeck}></DeckCard>
            )
          })}
        </section>
      </div>
    </section>
  )
}
export default DeckList;