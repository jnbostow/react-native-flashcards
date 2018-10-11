import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/async";
import { gray, green } from '../utils/colors'


class DeckList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }


    render(){
        const { decks } = this.props ///should this be in the component state or just in props?

        return(
            <View style={styles.container}>
            < ScrollView contentContainerStyle={styles.scrollContainer}>
                {Object.keys(decks).length <= 0?
                        <Text style={[styles.h2, {textAlign: 'center', marginTop: 30}]}> You have no decks to view</Text>
                        :
                        Object.keys(decks).map(deckName =>
                            <TouchableWithoutFeedback key={deckName} onPress={() => this.props.navigation.navigate(
                                'DeckDetails',
                                { deckName: deckName }
                            )}>
                                <View  style={styles.deckCard}>
                                    <Text style={[styles.h2, styles.textWithShadow]}>{ decks[deckName].title }</Text>
                                    <Text style={[styles.p, styles.textWithShadow]}>{ decks[deckName].questions.length } cards</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
            </ ScrollView>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckList)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gray,
    },
    scrollContainer: {
        backgroundColor: gray,
        alignItems: 'stretch',
        paddingTop: 10,
        paddingBottom: 10,

    },
    deckCard: {
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: green,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3
    },
    h2: {
       fontSize: 28,
       color: 'white',
        fontWeight: '700'
    },
    p: {
        fontSize: 14,
        color:  'white'
    },
    textWithShadow:{
        textShadowColor: 'rgba(46,46,46, 0.75)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2
    }
});