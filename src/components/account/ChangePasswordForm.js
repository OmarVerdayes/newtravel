import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export default function ChangePasswordForm(props) {
  const { close } = props;
  const [password, setPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: yup.object({
      password: yup.string().required("Contraseña obligatoria"),
      newPassword: yup.string().required("Nueva contraseña obligatoria"),
      repeatNewPassword: yup
        .string()
        .required("Nueva contraseña obligatoria")
        .oneOf([yup.ref("newPassword")], "las contraseñas deben ser iguales"),
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
        await updatePassword(user, formValue.newPassword);
        close();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "error al cambiar contraseña",
        });
      }
    },
  });
  const showPass = () => {
    setPassword(!password);
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Contraseña actual"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: password ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Nueva contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: password ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Confirmar nueva contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: password ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
        errorMessage={formik.errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit} //cuando se envia algo
        loading={formik.isSubmitting} //cuando se este enviando algo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    paddingVertical: 10,
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    width: "95%",
    marginTop: 15,
  },
  btnStyle: {
    backgroundColor: "#0D5BD7",
  },
});
