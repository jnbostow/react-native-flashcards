import { AsyncStorage } from 'react-native'
import { removeDeck, setCard, setDeck, receiveData } from '../actions/cards'


export function handleInitialData () {

    return (dispatch) => {

        return AsyncStorage.getAllKeys().then( keys => {
                return AsyncStorage.multiGet(keys)
            }).then(allData => {
                dispatch(receiveData(allData.reduce( (acc,datum) => {
                    acc[datum[0]] = JSON.parse(datum[1])
                    return acc
                },{})))
        })
    }
}

export function handleSetDeck (deckName) {
    return (dispatch) => {
        return AsyncStorage.setItem(deckName ,JSON.stringify({
            title: deckName,
            questions: []
        })).then(
            dispatch(setDeck(deckName))
        )
    }
}

export function handleSetCard (card, deckName) {
    return (dispatch) => {
        return AsyncStorage.getItem(deckName).then( deck => {
            const deckObj = JSON.parse(deck)
            AsyncStorage.setItem(deckName, JSON.stringify({
                title: deckObj.title,
                questions: [
                    ...deckObj.questions,
                    {
                        question: card.question,
                        answer: card.answer
                    }
                ]
            }))
        }).then(
            dispatch(setCard(card, deckName))
        )
    }
    //if doesn't work try mergeItem
}

export function handleRemoveDeck (deckName) {
    return (dispatch) => {
        return AsyncStorage.removeItem(deckName).then(
            dispatch(removeDeck(deckName))
        )
    }
}

