import React, { useState, useEffect } from "react";
import axios from 'axios';

const CardDeck = ({ deckId }) => {
    const [card, setCard] = useState(null);
    const [isShuffling, setIsShuffling] = useState(false);

    const drawCard = async () => {
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            if (res.data.success) {
                setCard(res.data.cards[0]);
            } else {
                alert('Error: no cards remaining!');
            }
        } catch (error) {
            console.error('Error drawing a card:', error)
        }
    };

    const shuffleDeck = async () => {
        setIsShuffling(true);
        setCard(null); //Remove the displayed card when shuffling

        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
            if (res.data.success) {
                alert('Deck shuffled successfully!')
            } else {
                alert('Error shuffling the deck!')
            }
        } catch (error) {
            console.error('Error shuffling the deck:', error)
        } finally {
            setIsShuffling(false)
        }
    };

    return (
        <div>
            <button onClick={drawCard}>Draw a Card</button>
            <button onClick={shuffleDeck} disabled={isShuffling}>Shuffle Deck</button>
            {card && (
                <div>
                    <img src={card.image} alt={card.code} />
                    <p>{`Card: ${card.value} of ${card.suit}`}</p>
                </div>
            )}
        </div>
    );
};

export default CardDeck;