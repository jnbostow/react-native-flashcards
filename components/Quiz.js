import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import {gray, pink, green } from "../utils/colors";

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnswer: false,
            currCard: 0,
            answers: {correct: 0, incorrect: 0}
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmitCorrect = this.handleSubmitCorrect.bind(this);
        this.handleSubmitIncorrect = this.handleSubmitIncorrect.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
    }


    handleToggle() {
        this.setState((state) => ({
            showAnswer: !state.showAnswer
        }));
    }

    handleSubmitCorrect() {
        this.setState(state => ({
            currCard: state.currCard + 1,
            answers: { correct: state.answers.correct + 1,
                incorrect: state.answers.incorrect
            }
        }))
    }

    handleSubmitIncorrect() {
        this.setState(state => ({
            currCard: state.currCard + 1,
            answers: {
                correct: state.answers.correct,
                incorrect: state.answers.incorrect + 1
            }
        }))
    }

    handleRestart() {
        this.setState({
            showAnswer: false,
            currCard: 0,
            answers: {correct: 0, incorrect: 0}
    })
    }

    componentDidMount() {
        clearLocalNotification().then(
            setLocalNotification
        )
    }

    render(){
        const { deck} = this.props.navigation.state.params
        const { showAnswer, currCard, answers } = this.state

        return(
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    <Text style={styles.h2}>{deck.title} Quiz</Text>
                    <View>
                        {deck.questions.length === 0?
                            <Text style={styles.p}>You have no questions for this deck.</Text>
                            :
                            currCard >= deck.questions.length?
                                <View>
                                    <Text style={styles.p}>Your score is: {answers.correct}/{deck.questions.length}</Text>
                                    <TouchableOpacity onPress={this.handleRestart}
                                                      style={[styles.button,{borderColor: 'white', backgroundColor: green}]}
                                    >
                                        <Text style={[styles.buttonText, {color: 'white'}]}>Restart Quiz</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    <View style={styles.questionCard}>
                                        <View style={styles.questionTitleWrapper}>
                                            <Text style={styles.questionTitleText}>{!this.state.showAnswer?'Question':'Answer'}</Text>
                                            <Text style={styles.questionTitleNumbers}>{currCard +1} of {deck.questions.length}</Text>
                                        </View>
                                        <View style={{justifyContent: 'center'}}>
                                            <Text style={styles.questionText}>
                                                {!this.state.showAnswer?
                                                    deck.questions[currCard].question :
                                                    deck.questions[currCard].answer}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={this.handleToggle}>
                                        <View>
                                            <Text style={styles.questionToggle}>{!showAnswer?'Show Answer': 'Show Question'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{marginBottom: 30}}>
                                        <TouchableOpacity onPress={this.handleSubmitCorrect}
                                                                  style={[styles.button,{borderColor: green, backgroundColor: gray}]}
                                        >
                                            <Text style={[styles.buttonText, {color: green}]}>Correct</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.handleSubmitIncorrect}
                                                                  style={[styles.button,{borderColor: pink, backgroundColor: gray}]}
                                        >
                                            <Text style={[styles.buttonText, {color: pink}]}>Incorrect</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                        }

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gray,
        alignItems: 'stretch',
        paddingTop: 20
    },
    scrollContainer: {
        backgroundColor: gray,
    },
    h2: {
        fontSize: 30,
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 30
    },
    p: {
        fontSize: 18,
        color:  'white',
        textAlign: 'center',
        paddingTop: 15,

    },
    questionText: {
        textAlign: 'center',
        color: gray,
        fontSize: 24,
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    questionTitleWrapper: {
        backgroundColor: green,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15
    },
    questionTitleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    questionTitleNumbers: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    questionToggle: {
        fontSize: 16,
        color: pink,
        textAlign: 'center',
        marginBottom: 30
    },
    button: {
        borderWidth: 4,
        borderRadius: 5,
        marginTop: 20,
        width: 250,
        paddingTop: 20,
        paddingBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20
    },
    questionCard: {
        overflow: 'hidden',
        alignItems: 'stretch',
        minHeight: 200,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3
    }
});