import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar, text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

export default function ProfileInfo(props) {
  const { setTextLoading, setVisiblLoading } = props;
  // console.log(props);
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [photo, setPhoto] = useState(photoURL);
  // console.log(uid);
  const changePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (!result.canceled) uploadPhoto(result.uri);
  };
  const uploadPhoto = async (uri) => {
    //console.log(uri);
    setTextLoading("Cargando foto");
    setVisiblLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const refStorage = ref(storage, `imgProfile/${uid}`);
    uploadBytes(refStorage, blob).then((snapshot) => {
      //console.log(snapshot.metadata);
      updatePhoto(snapshot.metadata.fullPath);
    });
  };
  const updatePhoto = async (imgPath) => {
    //console.log(imgPath);
    setTextLoading("Actualizando foto");
    const storage = getStorage();
    const refImg = ref(storage, imgPath);
    const urlImg = await getDownloadURL(refImg);
    //console.log("UrlImagen->"+urlImg);
    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: urlImg }).then(() => {});
    setPhoto(urlImg);
    setVisiblLoading(false);
  };
  return (
    <View style={styles.viewPhoto}>
      <Avatar
        size="large"
        rounded={true}
        icon={{ type: "material", name: "person" }}
        containerStyle={styles.avatar}
        source={{ uri: photo }}
      >
        <Avatar.Accessory size={25} onPress={changePhoto} />
      </Avatar>
      <View>
        <Text style={styles.nameUser}>{displayName || "USUARIO"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#1bb0ce",
    borderRadius: 10,
    margin: 10,
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "#0D5BD7",
  },
  nameUser: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
