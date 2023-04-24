import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export default function ChangeEmailForm(props) {
  const { close, onReload } = props;
  const [password, setPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo obligatorio")
        .required("Emial obligatorio"),
      password: Yup.string().required("Contraseña obligatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const user = getAuth().currentUser;
        const credential = EmailAuthProvider.credential(
          user.email,
          formValue.password
        );
        reauthenticateWithCredential(user, credential);
        await updateEmail(user, formValue.email);
        onReload();
        close();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al actualizar el emial",
        });
      }
    },
  });

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
          // onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "eye-off-outline",
          color: "#c2c2c2",
          //onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar correo"
        containerStyle={styles.containerBtn}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    margginTop: 20,
  },
  icon: {
    color: "#C1C1C1",
  },
  containerBtn: {
    width: "95%",
    marginTop: 20,
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "blue",
  },
});
