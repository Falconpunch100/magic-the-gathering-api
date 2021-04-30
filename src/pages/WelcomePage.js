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
            console.log(rowOfCards)
            setRandomCards(rowOfCards)
        }
        getRandomCards()
    }, [])
    return (
        <section className="welcome">
            <Navbar></Navbar>
            {randomCards !== null ? <Ticker height="300" speed={6} move={true}>
                {() => (
                    <>
                        <p>Aaaaaaaaaaaaaaaaaaaa I am a Steve I must find the Diamonds and build an house.</p>
                        {randomCards.slice(0, 10).map((card) => {
                            return <img src={card.imageUrl} alt="" />
                        })}
                    </>
                )}
            </Ticker> : null}

        </section>
    )
}
export default WelcomePage;

//Something triggers the movement of the Ticker, but we don't know what triggers it. It doesn't move immediately when we load.