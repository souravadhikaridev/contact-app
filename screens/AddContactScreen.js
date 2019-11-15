import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
  AsyncStorage
} from 'react-native';

import {
  Form,
  Item,
  Label,
  Button,
  Input
} from 'native-base'

export default class AddContactScreen extends React.Component {
 
  constructor( props )
  {
    super( props )
    this.state = {
      fname :"",
      lname: "",
      phone: "",
      email: "",
      address: ""
    }
  }

  static navigationOptions = {
    title: "Add New Contacts"
  }

  // save contacts
  saveContacts = async () =>{
    if(
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== ""
    ){
        // Alert.alert('Save Successfully !')
        var contact = {
          fname: this.state.fname,
          lname: this.state.lname,
          phone: this.state.phone,
          email: this.state.email,
          address: this.state.address
        }
        await AsyncStorage.setItem( Date.now().toString(), JSON.stringify( contact ))
        .then(()=>{
        this.props.navigation.goBack()
        })
        .catch( ( error )=>{
          console.log( error )
        })

    }else{
      Alert.alert('All fields required !')
    }
  }

  render(){
  return (
    <TouchableWithoutFeedback 
      onPress ={()=>{
        Keyboard.dismiss
      }}
    >
    <ScrollView style={styles.container}>
      <Form>
        <Item style={styles.inputItem}>
          <Label style={styles.inputLabelText}>First Name : </Label>
          <Input 
            style={styles.inputText}    
            autoCapitalize ="none"
            autoCorrect = {false}
            keyboardType = "default"
            onChangeText = { fname => this.setState({fname})}
            />
        </Item>
      <Item style={styles.inputItem}>
        <Label style={styles.inputLabelText}>Last Name : </Label>
        <Input
          style={styles.inputText} 
          autoCorrect = {false}
          autoCapitalize = "none"
          keyboardType = "default"
          onChangeText = { lname => this.setState({lname})}
        />
      </Item>
      <Item style={styles.inputItem}>
        <Label style={styles.inputLabelText}>Phone : </Label>
        <Input
          style={styles.inputText} 
          autoCorrect = {false}
          autoCapitalize = "none"
          keyboardType = "decimal-pad"
          onChangeText = { phone => this.setState({phone})}
        />
      </Item>
      <Item style={styles.inputItem}>
        <Label style={styles.inputLabelText}>Email : </Label>
        <Input
          style={styles.inputText} 
          autoCorrect = {false}
          autoCapitalize = "none"
          keyboardType = "email-address"
          onChangeText = { email => this.setState({email})}
        />
      </Item>
      <Item style={styles.inputItem}>
        <Label style={styles.inputLabelText}>Address : </Label>
        <Input
          style={styles.inputText} 
          autoCorrect = {false}
          autoCapitalize = "none"
          keyboardType = "default"
          onChangeText = { address => this.setState({address})}
        />
      </Item>
      </Form>
      <Button 
        primary
        style={styles.saveContactButton}
        onPress = { ()=> {this.saveContacts()}}> 
        <Text style={styles.saveContactButtonText}> Save Contact </Text>
      </Button>
      <View style={styles.emptyView}></View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
  inputItem: {
    margin: 10,
  },
  inputLabelText: {
    fontWeight: "bold",
    fontSize: 20
  },
  inputText: {
    fontSize: 20,
    color: "#2C3335"
  },
  saveContactButton: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  saveContactButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  emptyView: {
    height: 400
  }
});
