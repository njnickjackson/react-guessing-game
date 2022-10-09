import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './GuessingGame.css'

function GuessingGame() {
    const [luckyNum, setLuckyNum] = useState("")
    const [numOfGuesses, setNumOfGuesses] = useState(0)
    const [userGuess, setUserGuess] = useState("")
    const [userMessage, setUserMessage] = useState("Start Guessing")
    
    const luckyLocal = localStorage.getItem("luckyNum")
    const numOfGuessesLocal = JSON.parse(localStorage.getItem("numOfGuesses"))

    if (!luckyLocal) {
        luckyNumber()
    }

    if (numOfGuesses === 0 && !numOfGuessesLocal) {
        localStorage.setItem("numOfGuesses", 0)
    }

    function luckyNumber() {
        const currentLucky = Math.floor(Math.random() * 100) + 1
        setLuckyNum(currentLucky)
        localStorage.setItem("luckyNum", currentLucky)
        localStorage.setItem("numOfGuesses", 0)
        console.log(luckyNum)
        setUserGuess("")
        setUserMessage("Start Guessing")
    }

    function findNumOfGuesses() {
        setNumOfGuesses(numOfGuessesLocal + 1)
        localStorage.setItem("numOfGuesses", (numOfGuessesLocal + 1))
        if (parseInt(userGuess) < JSON.parse(luckyLocal)) {
            setUserMessage(`Number (${userGuess}) is too low`)
            setUserGuess("")
        }
        if (parseInt(userGuess) > JSON.parse(luckyLocal)) {
            setUserMessage(`Number (${userGuess}) is too high`)
            setUserGuess("")
        } 
        if (parseInt(userGuess) === JSON.parse(luckyLocal)) {
            setUserMessage(`Congrats you guessed it! The lucky number was ${userGuess}!`)
        }

    }
    
    function findUserGuess(event) {
        setUserGuess(event.target.value)
    }

    return (
        <div className="guessingGame">
            <p>I am thinking of a number between 1 and 100.  Guess the Lucky Number!</p>
            <p>You have made {numOfGuessesLocal} guesses</p>
            <div className="guessing-form">
                <Form>
                    <Form.Label></Form.Label>
                    <Form.Control type="text" name="guess" value={userGuess} onChange={findUserGuess}/>
                </Form>
            </div>
            <div className="guessing-btn">
                <Button type="submit" onClick={findNumOfGuesses}>Guess</Button>
            </div>
            <div className="guessing-btn">
                <Button type="submit" onClick={luckyNumber}>Reset</Button>
            </div>
            <p>{userMessage}</p>
        </div>
    )
}

export default GuessingGame