import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Alert,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  Linking
} from 'react-native';
import { Entypo } from '@expo/vector-icons'

export default class ViewContactScreen extends React.Component {
 
    constructor( props )
    {
        super( props )
        this.state = {
            fname: "dummyText",
            lname: "dummyText",
            phone: "dummyText",
            email: "dummyText",
            address: "dummyText",
            key: ""
        }
    }
    static navigationOptions = {
        title: "View Contact"
    }

    // get all data of the spcific contact
    componentDidMount(){
        const { navigation } = this.props
        navigation.addListener("willFocus", ()=>{
            var key = this.props.navigation.getParam("key", "")
            // extract data from that key
            this.getAllData( key )
        })
    }

    getAllData = async key =>{
        await AsyncStorage.getItem( key )
        .then( contactJsonString =>{
            var contact = JSON.parse(contactJsonString)
            contact[ "key" ] = key
            this.setState( contact )
        })
        .catch(error =>{
            console.log("key error: "+ error)
        })
    }

    //call functionality
    callFunctionality = phone =>{
        let phoneNumber = phone
        if( Platform.OS !== "android"){
            phoneNumber = `telpromt: ${phone}`
        }else{
            phoneNumber = `tel: ${phone}`
        }
        Linking.canOpenURL( phoneNumber )
            .then( supported =>{
                if(!supported){
                    Alert.alert("Phone number is not correct")
                }else{
                    return Linking.openURL( phoneNumber )
                }
            })
            .catch( error =>{
                console.log("call error: "+error)
            })
    }

    //sms functionality
    smsFunctionality = phone =>{
        let phoneNumber = phone
        phoneNumber = `sms: ${phone}`
        Linking.openURL( phoneNumber )
            .then( supported =>{
                if(!supported)
                {
                    Alert.alert("Phone number is not correct")
                }else{
                    Linking.openURL(phoneNumber)
                }
            })
            .catch( error=>{
                console.log("sms error: "+error)
            })
    }

    //edit contact details
    editContactDetails = key =>{
        this.props.navigation.navigate("Edit", {key: key})
    }

    //delete contact
    deleteContact = key =>{
        Alert.alert("Are You Sure ?", `${this.state.fname} ${this.state.lname}`,[
            {
                text: "Cancel",
                onPress: ()=> console.log("Cancel")
            },
            {
                text: "Ok",
                onPress: async () =>{
                    await AsyncStorage.removeItem( key )
                    .then(()=>{
                        this.props.navigation.goBack()
                    })
                    .catch(error =>"Delete error: "+ error)
                }
            }
        ])
    }

  render(){
  return (
    <View style={styles.container}>
            <View style={styles.introView}>
                <View style={styles.iconCon}>
                    <Text style={styles.iconText}>{this.state.fname[0].toUpperCase()}</Text>
                </View>
                <Text style={styles.infoTextName}>{this.state.fname} {this.state.lname}</Text>
                <Text style={styles.infoTextEmail}>{this.state.email}</Text>
                <Text style={styles.infoTextAddress}>{this.state.address}</Text>
            </View>
            <View style={styles.toolsCon}>
                <TouchableOpacity
                    onPress = {()=>{this.callFunctionality(this.state.phone)}}
                >
                   <Entypo 
                    name="phone"
                    size = {40}
                    color = "#1287A5"
                    />
                <Text style={{color: "#1287A5", fontSize: 15}}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {()=> this.smsFunctionality(this.state.phone)}
                >
                   <Entypo 
                    name="message"
                    size = {40}
                    color = "#0A3D62"
                   />
                <Text style={{color: "#0A3D62", fontSize: 15}}>Message</Text>   
                </TouchableOpacity>
            </View>
            <View style={styles.phoneNumCon}>
                <Text style={styles.phoneNumText}>{this.state.phone}</Text>
                <Text style={{color: "#616C6F", fontSize: 18}}>Mobile</Text>
            </View>
            <View style={styles.deleteEditCon}>
                <TouchableOpacity
                 style={[styles.Button, {backgroundColor: "#E71C23",  borderWidth: 1,
                 borderColor: "rgba(0,0,0,0.3)"}]}
                    onPress = {()=> this.deleteContact(this.state.key)}
                 >
                    <Entypo 
                        name = "trash"
                        size = {35}
                        color = "#fff"
                    />   
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.Button, {backgroundColor: "#2475B0",  borderWidth: 1,
                borderColor: "rgba(0,0,0,0.3)"}]}
                    onPress = {() => this.editContactDetails( this.state.key )}
                >
                    <Entypo 
                        name = "edit"
                        size = {35}
                        color = "#fff"
                    />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: "row",justifyContent: "space-around"}}>
            <Text style={{color: "#E71C23", fontSize: 16}}>Delete</Text> 
            <Text style={{color: "#2475B0", fontSize: 16}}>Edit</Text> 
            </View>
    </View>
  );
}
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    introView: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#000",
        padding: 35,
        borderBottomWidth: 1,
        borderBottomColor: "#c1c1c1"
    },
    iconCon: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "#1BCA9B"
    },
    iconText: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#fff"
    },
    infoTextName: {
        fontSize: 30,
        fontWeight: "400",
        marginTop: 20
    },
    infoTextEmail: {
        fontSize: 15,
        fontWeight: "400",
        marginTop: 10
    },
    infoTextAddress: {
        fontSize: 13,
        fontWeight: "400",
        marginTop: 5
    },
    toolsCon: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderBottomColor: "#c1c1c1"
    },
    phoneNumCon: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#c1c1c1"
    },
    phoneNumText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4C4B4B"
    },
    deleteEditCon: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    Button: {
        width: 60,
        height: 60,
        backgroundColor: "#1abc9c",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    }
})