import React, { useState, useEffect } from "react";
import axios from 'axios';

const CardDeck = ({ deckId }) => {
    const [card, setCard] = useState(null);

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

    return (
        <div>
          <button onClick={drawCard}>Draw a Card</button>
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