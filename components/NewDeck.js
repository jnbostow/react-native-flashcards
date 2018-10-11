import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { handleSetDeck } from "../actions/async";
import { green, gray} from '../utils/colors'

class NewDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleCreate() {
        const { title } = this.state
        const { decks } = this.props
        this.props.dispatch(handleSetDeck(title))
        this.setState({title: ''})
        this.props.navigation.navigate(
            'DeckDetails',
            { deckName: title }
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>What is the name of your new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(title) => this.setState({title: title})}
                    value={this.state.title}
                />
                <TouchableOpacity onPress={this.handleCreate} >
                    <Text style={styles.button}>CREATE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(NewDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: gray
    },
    textInput: {
        height: 40,
        margin: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white'
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    },
    button: {
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 30,
        borderColor: 'white',
        width: 200,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: green,
        color: 'white',
        fontSize: 18
    }
});