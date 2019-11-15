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

export default class EditContactScreen extends React.Component {
 
  constructor( props )
  {
    super( props )
    this.state = {
      fname :"",
      lname: "",
      phone: "",
      email: "",
      address: "",
      key: ""
    }
  }

  static navigationOptions = {
    title: "Edit Contact"
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      this.getContactDetail(key);
    });
  }

  getContactDetail = async key => {
    await AsyncStorage.getItem(key)
      .then(contactJsonString => {
        var contact = JSON.parse(contactJsonString);
        //set key in this object
        contact["key"] = key;
        //set state
        this.setState(contact);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // save contacts
    updateContacts = async key =>{
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
        await AsyncStorage.mergeItem(key, JSON.stringify( contact ))
        .then(()=>{
        this.props.navigation.goBack()
        })
        .catch( ( error )=>{
          console.log( error )
        })
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
            value = {this.state.fname}
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
          value = {this.state.lname}
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
          value = {this.state.phone}
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
          value = {this.state.email}
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
          value = {this.state.address}
        />
      </Item>
      </Form>
      <Button 
        success 
        style={styles.saveContactButton}
        onPress = { ()=> {this.updateContacts( this.state.key )}}> 
        <Text style={styles.updateContactButtonText}> Update Contact </Text>
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
  updateContactButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  emptyView: {
    height: 400
  }
});
