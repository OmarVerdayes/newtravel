import React, { useEffect, useState } from "react";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import DetailsScreen from "../screens/DetailsScreen";
import Information from "../screens/Information";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";
import IndexStack from "./IndexStack";
import DetailsStack from "./DetailsStack";
import ProfileStack from "./ProfileStack";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
/*
const Drawer=createDrawerNavigator();
export default function AppNavigation(){
    return(
        
        <Drawer.Navigator>
            <Drawer.Screen
            name="index"
            component={IndexStack}
            options={{ title: "Inicio" }}
            />
            <Drawer.Screen
            name="details"
            component={DetailsScreen}
            options={{ title: "Detalles" }}
            />
            <Drawer.Screen
            name="info"
            component={Information}
            options={{ title: "Información" }}
            />
            <Drawer.Screen
            name="login"
            component={LoginScreen}
            options={{ title: "Inicio Sesión" }}
            />
        </Drawer.Navigator>

    )
}
*/
const Tab = createBottomTabNavigator();
export default function AppNavigation() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setSession(user ? true : false);
    });
  }, []);

  return session ? (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00E9ED",
        tabBarInactiveTintColor: "#337AFF",
        tabBarIcon: ({ color, size }) => showIcons(route, color, size),
      })}
    >
      <Tab.Screen
        name="index"
        component={IndexStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="details"
        component={DetailsStack}
        options={{ title: "Detalles" }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileStack}
        options={{ title: "Información" }}
      />
    </Tab.Navigator>
  ) : (
    <IndexStack />
  );
}
function showIcons(route, color, size) {
  let icono;
  if (route.name === "index") {
    icono = "home-circle-outline";
  }
  if (route.name === "details") {
    icono = "details";
  }
  if (route.name === "profile") {
    icono = "account-outline";
  }
  return (
    <Icon type="material-community" name={icono} color={color} size={size} />
  );
}

// const Stack = createNativeStackNavigator();
// export default function AppNavigation() {
//   return (
//     <Stack.Navigator>
//         <Stack.Screen
//           name="index"
//           component={IndexScreen}
//           options={{ title: "Inicio" }}
//         />
//     <Stack.Screen
//           name="details"
//           component={DetailsScreen}
//           options={{ title: "Inicio" }}
//     />
//         <Stack.Screen
//           name="info"
//           component={Information}
//           options={{ title: "Inicio" }}
//     />
//     </Stack.Navigator>
//   )
// }
