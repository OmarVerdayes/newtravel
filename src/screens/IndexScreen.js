//rnfs
import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import LoginScreen from './LoginScreen';
import Loading from '../components/common/Loading';


export default function IndexScreen(props) {
  //console.log(props);
  const {navigation}=props;
  const[session,setSession]=useState(null)
  //detecta cuando la variable indicada sufre un cambio
  useEffect(()=>{const auth=getAuth(); onAuthStateChanged(auth,(user)=>{ 
   setSession(user ? true:false);
  })},[])
  if(session===null){
    return <Loading visible={true} text={"Validando sesión"}/>
  }
  return session? (
    <View>
      <Text>indexScreen</Text>
      <Button title='Ir a detalles' onPress={()=>navigation.navigate("details",{screen:"details"})}/>
      <Button title='Perfil' onPress={()=>navigation.navigate("profile")} />
      <Button title='Login' onPress={()=>navigation.navigate("index",{screen:"loginS"})} />
    </View>
  ):<LoginScreen/>
}

const styles = StyleSheet.create({})