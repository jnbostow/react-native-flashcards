import React from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { Provider } from 'react-redux'
import store from './Index'
import { green, teal, gray, beige } from './utils/colors'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'

//import { AsyncStorage } from 'react-native'

//AsyncStorage.clear()


const TabNav = createBottomTabNavigator({
    DecksList: {
      screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Deck List',
            tabBarIcon: ({ tintColor }) => Platform.OS === 'ios'?
                <FontAwesome name='list' size={30} color={tintColor} />
                :
                <MaterialIcons name='list' size={30} color={tintColor} />
        }
    },
    NewDeck: {
      screen: NewDeck,
        navigationOptions: {
            title: 'New Deck',
            tabBarIcon: ({ tintColor}) => Platform.OS === 'ios'?
                <FontAwesome name='plus' size={30} color={tintColor} />
                :
                <MaterialIcons name='md-add' size={30} color={tintColor} />
        }
    }
},{
    tabBarOptions: {
        activeTintColor: green,
        inactiveTintColor: 'white',
        style: {
            height: 56,
            backgroundColor: gray,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
},{
    initialRouteName: 'DeckList'
});

const StackNav = createStackNavigator(
    {
        Home: {
            screen: TabNav,
            navigationOptions: {
                header: null
            }
        },
        DeckDetails: {
            screen: DeckDetails,
            navigationOptions: {
                title: 'Deck Details',
                headerTitleStyle: {

                },
                headerStyle: {
                    backgroundColor: green,
                    color: 'white'
                }
            }
        },
        AddCard: {
            screen: AddCard,
            navigationOptions: {
                title: 'Add Card'
            }
        },
        Quiz: {
            screen: Quiz,
            navigationOptions: {
                title: 'Quiz'
            }
        }
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: green,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
        cardStyle: {backgroundColor: gray}
    }
);


export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification()
    }

  render() {

    return (
        <Provider store={store}>
          <View style={styles.container}>
              <View style={{height: Constants.statusBarHeight, backgroundColor: "black" }}>
                  <StatusBar translucent barStyle="light-content" />
              </View>

              <StackNav />
          </View>
        </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
