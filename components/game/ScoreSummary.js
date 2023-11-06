import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";

function ScoreSummary({instruction, score}) {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.instruction}>{instruction}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  )
}

export default ScoreSummary;

const styles = StyleSheet.create({
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary700,
    borderRadius: 8,
    padding: 8,
    margin: 8,
    minWidth: '100%'
  },
  instruction: {
    fontSize: 20,
    textAlign: 'center',
  },
  score: {
    fontSize: 30,
    color: 'white'
  }

});