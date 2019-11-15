import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  FlatList,
  AsyncStorage 
} from 'react-native';
import { Card } from 'native-base'
import { Entypo } from '@expo/vector-icons'

export default class HomeScreen extends React.Component {
 
  constructor( props )
  {
    super( props )
    this.state = {
      contactData: []
    }
  }
  static navigationOptions = {
    title: "Contact Manager"
  }

  //mount all the compont
  componentWillMount(){
    const { navigation } = this.props
    navigation.addListener('willFocus', ()=>{
      this.getAllContactDetails()
    })
  }

  //get all contacts
  getAllContactDetails = async () =>{
    await AsyncStorage.getAllKeys()
    .then( keys =>{
      return AsyncStorage.multiGet( keys )
      .then( result => {
        this.setState({
          contactData: result.sort(function(a, b) {
            if (JSON.parse(a[1]).fname < JSON.parse(b[1]).fname) {
              return -1;
            }
            if (JSON.parse(a[1]).fname > JSON.parse(b[1]).fname) {
              return 1;
            }
            return 0;
          })
        })
      })
      .catch( error =>{
        console.log( "multiset error: "+ error)
      })
    })
    .catch( error =>{
      console.log( "keys error: "+ error)
    })
  }

  render(){
  return (
    <View style={styles.container}>
      <FlatList 
        data = {this.state.contactData}
        renderItem = {({ item }) =>{
          contactDetail = JSON.parse( item[1])
          return( 
            <TouchableOpacity
              onPress = {()=> this.props.navigation.navigate('View', {
                key: item[0].toString()
              })}
            >
            <Card style={styles.listItem}>
              <View style={styles.contactIconCon}>
                <Text style={styles.contactIconText}>
                  {contactDetail.fname[0].toUpperCase()}
                </Text>
              </View>
              <View style={styles.infoCon}>
                <Text style={styles.infoText}>{contactDetail.fname} {contactDetail.lname}</Text>
                <Text style={styles.infoText}>{contactDetail.phone}</Text>
              </View>
            </Card>
            </TouchableOpacity>
          )
        }}
    keyExtractor={(item, index) => item[0].toString()}
    />
     <TouchableOpacity style={styles.addIconCon}
      onPress={()=>{this.props.navigation.navigate(
      'Add')}}>
        <Entypo 
          name = "plus"
          size = {30}
          color = "#fff"
        />
     </TouchableOpacity>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addIconCon: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor:"#E71C23",
    position: "absolute",
    bottom: 30,
    right: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
  },
  listItem:{
    flexDirection: "row",
    padding: 20
  },
  contactIconCon:{
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#2C3335"
  },
  contactIconText:{
    color: "#fff",
    fontSize: 30,
    fontWeight: "400"
  },
  infoCon: {
    flexDirection: "column",
  },
  infoText: {
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 15,
    color: "#4C4B4B",
    fontWeight: "bold"
  }
});
