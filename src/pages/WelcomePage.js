/* eslint-disable */ 
import Navbar from "../Navbar.js"
import Ticker from 'react-ticker'
import { useState, useEffect } from "react"
import "./WelcomePage.css"
import mtgAPI from "../api/mtg-api.js"

const setNames = ["10E", "2ED", "2XM", "9ED", "SHM"]
function WelcomePage() {
    const [randomCards, setRandomCards] = useState(null)
    useEffect(() => {
        async function getRandomCards() {
            const rowOfCards = []
            for (let i = 0; i < setNames.length; i++) {
                const response = await mtgAPI.get(`sets/${setNames[i]}/booster`)
                const tenCards = response.data.cards.slice(0, 10)
                rowOfCards.push(...tenCards)
            }
            setRandomCards(rowOfCards)
        }
        getRandomCards()
    }, [])
    return (
        <section className="welcome">
            <Navbar></Navbar>
            <div id="color-white">
                <h1>Welcome to the Magic: The Gathering test website!</h1>
                <p>This is a site that was created using React. Here, you may create your own account, and make your own Magic: The Gathering decks!</p>
            </div>

            {randomCards !== null ? <Ticker height="300" speed={6} move={true} mode={"smooth"}>
                {() => (
                    <>
                        {randomCards.slice(0, 10).map((card) => {
                            return (
                                <>
                                    {card.imageUrl === undefined ? null : <img key={card.id + card.name} src={card.imageUrl} alt="" style={{ width: "223px", height: "310px" }} />}
                                </>
                            )
                        })}
                    </>
                )}
            </Ticker> : null}
            {randomCards !== null ? <Ticker height="300" speed={5} move={true} direction="toRight" mode={"smooth"}>
                {() => (
                    <>
                        {randomCards.slice(11, 20).map((card) => {
                            return (
                                <>
                                    {card.imageUrl === undefined ? null : <img key={card.id + card.name} src={card.imageUrl} alt="" style={{ width: "223px", height: "310px" }} />}
                                </>
                            )
                        })}
                    </>
                )}
            </Ticker> : null}
            {randomCards !== null ? <Ticker height="300" speed={4} move={true} mode={"smooth"}>
                {() => (
                    <>
                        {randomCards.slice(20, 30).map((card) => {
                            return (
                                <>
                                    {card.imageUrl === undefined ? null : <img key={card.id + card.name} src={card.imageUrl} alt="" style={{ width: "223px", height: "310px" }} />}
                                </>
                            )
                        })}
                    </>
                )}
            </Ticker> : null}
            {randomCards !== null ? <Ticker height="300" speed={7} move={true} direction="toRight" mode={"smooth"}>
                {() => (
                    <>
                        {randomCards.slice(31, 40).map((card) => {
                            return (
                                <>
                                    {card.imageUrl === undefined ? null : <img key={card.id + card.name} src={card.imageUrl} alt="" style={{ width: "223px", height: "310px" }} />}
                                </>
                            )
                        })}
                    </>
                )}
            </Ticker> : null}
            {randomCards !== null ? <Ticker height="300" speed={8} move={true} mode={"smooth"}>
                {() => (
                    <>
                        {randomCards.slice(41, 50).map((card) => {
                            return (
                                <>
                                    {card.imageUrl === undefined ? null : <img key={card.id + card.name} src={card.imageUrl} alt="" style={{ width: "223px", height: "310px" }} />}
                                </>
                            )
                        })}
                    </>
                )}
            </Ticker> : null}
        </section>
    )
}
export default WelcomePage;