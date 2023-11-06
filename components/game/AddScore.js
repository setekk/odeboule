import {StyleSheet, TextInput, Text, View} from "react-native";
import InstructionText from "../ui/InstructionText";
import {useState} from "react";
import Colors from "../../constants/colors";

function AddScore({instruction, annotation, onAddScore }) {
  const [enteredScore, setEnteredScore] =  useState('')
  function scoreInputHandler(enteredScore) {
    setEnteredScore(enteredScore)
  }

  function onAddScoreHandler() {
    onAddScore(enteredScore)
  }

  return (
    <View style={styles.container}>
    <View style={styles.scoreContainer}>
      <InstructionText>{instruction}</InstructionText>
      <Text>{annotation}</Text>

      <View style={styles.numberContainer}>
        <TextInput
          style={styles.numberInput}
          placeholder={'?'}
          maxLength={2}
          keyboardType="number-pad"
          onChangeText={scoreInputHandler}
          value={enteredScore}
          autoFocus={true}
          onSubmitEditing={onAddScoreHandler}
        />
      </View>
    </View>
  </View>
  )
}

export default AddScore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary700,
    padding: 16,
    borderRadius: 8,
  },
  scoreContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  numberContainer: {
    flex:1
  },
  numberInput: {
    minHeight: 150,
    minWidth: 150,
    padding: 32,
    fontSize: 64,
    backgroundColor: Colors.primary500,
    borderColor: Colors.accent500,
    borderWidth: 2,
    borderRadius: 8,
    color: Colors.accent700,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})