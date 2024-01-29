import React, { useState, useEffect } from "react";
import CardDeck from "./CardDeck";
import axios from 'axios';

const Deck = () => {
    const[deckId, setDeckId]= useState(null);

    useEffect(() => {
        //Function to create new deck and set ID
      const createNewDeck = async () => {
        try{
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/');
            setDeckId(res.data.deck_id);
        } catch(error) {
            console.error('Error creating a new deck', error);
        }
      };

      //Call the function when the component mounts
      createNewDeck();
      
    }, []);

    if(!deckId) {
        return null; 
    }

    return(
        <div>
            <CardDeck deckId={deckId} />
        </div>
    )
};

export default Deck;