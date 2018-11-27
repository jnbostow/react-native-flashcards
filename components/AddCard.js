import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { handleSetCard } from "../actions/async";
import { connect } from 'react-redux'
import {gray, green} from "../utils/colors";

class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                question: '',
                answer: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { deck } = this.props.navigation.state.params

        this.props.dispatch(handleSetCard(
            {
                question: this.state.question,
                answer: this.state.answer
            },
            deck
        ))
        this.props.navigation.goBack()
    }

    render(){

        return(
            <View style={styles.container}>

                <TextInput
                    style={styles.textInput}
                    onChangeText={(question) => this.setState({question: question})}
                    value={this.state.question}
                    placeholder='Enter Question'
                    placeholderTextColor='white'
                />

                <TextInput
                    style={styles.textInput}
                    onChangeText={(answer) => this.setState({answer: answer})}
                    value={this.state.answer}
                    placeholder='Enter Answer'
                    placeholderTextColor='white'
                />

                <TouchableOpacity onPress={this.handleSubmit}
                >
                    <Text style={styles.button}>SUBMIT</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default connect()(AddCard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: gray,
        paddingTop: 30
    },
    textInput: {
        height: 40,
        margin: 15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white'
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
        fontSize: 18,
        fontWeight: 'bold'
    }
});