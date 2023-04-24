import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import RegisterScreen from './RegisterScreen';
import LoginForm from '../components/account/LoginForm';

export default function LoginScreen() {
  const navigation = useNavigation();
  const irAregistro=()=>{
    navigation.navigate('registerS');
  }
  return (
    <View>
      <Image source={require('../../assets/imagenes/skillet.jpg')} style={styles.logo}/>
      <View style={styles.contentForm}>
        <LoginForm/>
        <Text style={styles.text}>¿Aún no tienes cuenta?<Text style={styles.textBtn} onPress={irAregistro}>{" "}Registrate</Text></Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  logo:{
    width:"100%",
    height:150,
    resizeMode:"contain",
    marginTop:25
  },
  contentForm:{
    marginHorizontal:30,
  },
  text:{
    marginTop:15,
    marginHorizontal:10,
    alignSelf:"center"
  },
  textBtn:{
    fontWeight:"bold",
    color:"#0D5BD7"
  }
})
