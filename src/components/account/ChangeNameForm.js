import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { getAuth, updateProfile } from "firebase/auth";
import { async } from "@firebase/util";

export default function ChangeNameForm(props) {
  const { close, onReload } = props;
  const formik = useFormik({
    initialValues: {
      displayName: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required("Nombre y apellido obligatorios"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, {
          displayName: formValue.displayName,
        });
        onReload();
        close();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al actualizar nombre y apellido",
        });
      }
    },
  });
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre y apellido"
        rightIcon={{
          type: "material-community",
          name:  "account-circle-outline",
          color: "#c2c2c2",
        }}
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue(`displayName`, text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar nombre y apellido"
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
