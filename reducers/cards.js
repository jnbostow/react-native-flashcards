import { REMOVE_DECK, SET_CARD, SET_DECK, RECEIVE_DATA } from '../actions/cards'

export default function reducer (state = {}, action) {

    switch (action.type) {
        case REMOVE_DECK :
            const {[action.deckName]: deckToRemove, ...newState} = state
            return {
                ...newState
            }
        case SET_CARD :
            return {
                ...state,
                [action.deckName]: {
                    title: [action.deckName],
                    questions: [
                        ...state[action.deckName].questions,
                        action.card
                    ]
                }
            }
        case SET_DECK :
            return {
                ...state,
                [action.deckName]: {
                    title: action.deckName,
                    questions: []
                }

            }
        case RECEIVE_DATA :
            return {
                ...action.decks
            }
        default :
            return state
    }
}