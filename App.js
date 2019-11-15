import React from 'react';
import { createAppContainer, createStackNavigator} from 'react-navigation'

//screens
import HomeScreen from './screens/HomeScreen'
import AddContactScreen from './screens/AddContactScreen'
import ViewContactScreen from './screens/ViewContactScreen'
import EditContactScreen from './screens/EditContactScreen'

const MainNavigator = createStackNavigator({
  Home: HomeScreen,
  Add: AddContactScreen,
  View: ViewContactScreen,
  Edit: EditContactScreen
},{
  defaultNavigationOptions: {
    headerTintColor: "#fff",
    headerStyle:{
      backgroundColor: "#E71C23"
    },
    headerTitleStyle:{
      color: "#fff"
    }
  }
})

const App = createAppContainer( MainNavigator )
export default App