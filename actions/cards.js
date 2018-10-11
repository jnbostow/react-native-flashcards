export const REMOVE_DECK = 'REMOVE_DECK';
export const SET_CARD = 'SET_CARD';
export const SET_DECK = 'SET_DECK';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export function removeDeck (deckName) {
    return {
        type: REMOVE_DECK,
        deckName
    }
}

export function setCard (card, deckName) {
    return {
        type: SET_CARD,
        card,
        deckName
    }
}

export function setDeck(deckName) {
    return {
        type: SET_DECK,
        deckName
    }
}

export function receiveData(decks) {
    return {
        type: RECEIVE_DATA,
        decks
    }
}