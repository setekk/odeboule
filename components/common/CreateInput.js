import {Alert, Keyboard, StyleSheet, TextInput, View} from "react-native";
import IconButton from "../ui/IconButton";
import Colors from "../../constants/colors";
import React, {useState} from "react";

function CreateInput({placeholder, onCreate}) {
  const [enteredInput, setEnteredInput] = useState('');

  const createHandler = () => {
    if (enteredInput === '') {
      Alert.alert('Erreur','Veuillez saisir une valeur')
      return;
    }
    onCreate(enteredInput)
    setEnteredInput('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={enteredInput}
        onChangeText={setEnteredInput}
        onSubmitEditing={createHandler}
      />
      <View style={styles.iconButtonContainer}>
        <IconButton
          iconName='pluscircleo'
          size={36}
          color={'white'}
          onPress={createHandler} />
      </View>
    </View>
  );
}

export default CreateInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'flex-start',
  },
  input: {
    flex:1,
    height: 60,
    margin: 8,
    borderWidth: 1,
    padding: 10,
  },
  iconButtonContainer: {
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    margin: 8,
    padding: 10,
  }
});