import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import Quiz from '../components/Quiz'
import AddCard from '../components/AddCard'
import { connect } from 'react-redux'
import { handleRemoveDeck } from "../actions/async";
import { green, pink, gray } from '../utils/colors'

class DeckDetails extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }
    static navigationOptions = ()=> {
        return {
            title: 'Deck Details',
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    };

    handleDelete() {
        const {deckName} = this.props.navigation.state.params

        this.props.navigation.goBack()
        this.props.dispatch(handleRemoveDeck(deckName))


    }

    render(){
        const { deckName } = this.props.navigation.state.params
        const { decks } = this.props

        return(
            decks[deckName] === undefined?

                    <ActivityIndicator size="small"/>
                    :
                    <View style={styles.container}>
                        <View style={[styles.title, {flex: 1}]}>
                            <Text style={styles.h2}>{decks[deckName].title}</Text>
                            <Text style={styles.p}>{ decks[deckName].questions.length } cards</Text>
                        </View>
                        <View style={{flex: 3}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                'AddCard',
                                { deck: deckName }
                            )}>
                                <Text style={[styles.button, {color: 'white',marginTop: 15, borderColor: 'white', backgroundColor: gray}]}>Add Card</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                'Quiz',
                                { deck: decks[deckName] }
                            )}>
                                <Text style={[styles.button, {color: gray, marginBottom: 15, borderColor: green, backgroundColor: green}]}>Start Quiz</Text>
                            </TouchableOpacity>

                            <Button title='Delete' color={pink} onPress={this.handleDelete}/>
                        </View>
                    </View>

        )
    }
}

function mapStateToProps (state) {
    return {
        decks: state
    }
}


export default connect(mapStateToProps)(DeckDetails)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gray,
        alignItems: 'stretch',
    },
    title: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    h2: {
        fontSize: 30,
        color: 'white',
        fontWeight: '700',
        textAlign: 'center'
    },
    p: {
        fontSize: 18,
        color:  'white',
        textAlign: 'center',
        paddingTop: 15,

    },
    button: {
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 20,
        width: 250,
        paddingTop: 20,
        paddingBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
        overflow: 'hidden'
    },
    buttonText: {

    }
});